import React from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, Image } from 'react-native';

import { Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal'
import { TransactionRecordContext, CreditCardRecordContext } from '../util/context';

var moment = require('moment');

const AddTransaction = ({route, navigation}) => {

    const selectedCreditCard = route.params;
    const { updateTotalSpent } = React.useContext(CreditCardRecordContext);
    const { addTransaction } = React.useContext(TransactionRecordContext);

    const [newTransaction, setNewTransaction] = React.useState({
        id: Math.round(Math.random() * 10000000000 ),
        amount: {
            value : 0,
            currency : {
                symbol : "S$",
                code: 'SGD'
            }
        },
        category: { 
            name: null, 
            icon: null, 
            type: null,
            color: null
        },
        merchant: null,
        date: moment().format('DD MMM YYYY'),
    })

    const onChangeAmount = (amount) => {
        if (amount !== null) {
            setNewTransaction(prevState => {return {
                ...prevState,
                amount: {
                    ...prevState.amount,
                    value: amount
                }
            }})
        } else {
            setNewTransaction(prevState => {return {
                ...prevState,
                amount: {
                    ...prevState.amount,
                    value: 0
                }
            }})
        }
    }

    const onSelectCategory = (selectedCategory) => {
        setNewTransaction((prevState) => { return {
            ...prevState,
            category: {
                name: selectedCategory.eligibility, 
                icon: selectedCategory.icon.name, 
                type: selectedCategory.icon.type,
                color: selectedCategory.icon.color
            }
        }});
        setCategoryModal(false);
    }

    const onAddTransactionHandler = () => {
        addTransaction(newTransaction);
        updateTotalSpent(selectedCreditCard, newTransaction);
        navigation.goBack();
    }

    const onChangeMerchant = (merchant) => {
        if (merchant !== null) {
            setNewTransaction(prevState => {return {
                ...prevState,
                merchant: merchant
            }})
        } else {
            setNewTransaction(prevState => {return {
                ...prevState,
                merchant: 'None'
            }})
        }
    }

    const [selectedDate, setSelectedDate] = React.useState(moment());
    const [calendarModal, setCalendarModal] = React.useState(false);
    const [categoryModal, setCategoryModal] = React.useState(false);

    return (
        <View style = {{margin: 15, flex: 1}}>
            <View style = {{flex: 3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                {/* <Text style = {{fontSize: 36}}> $ 20 </Text> */}
                <Image source = {{uri: selectedCreditCard.image}} style = {{height: 160, width: 240, borderRadius: 20}}></Image>
            </View>
            <View style = {{flex: 2}}>
                <View style = {{marginVertical: 10}}>
                    <TouchableOpacity>
                        <View style = {{flexDirection: 'row'}}>
                            <View  style = {{flex: 1}}>
                                    <Text style = {{fontSize: 20}}> Amount </Text>
                            </View>
                            <TextInput placeholder={'0'} style = {{padding: 0, margin: 0, textAlign:'right'}} placeholderTextColor = {'black'} keyboardType={'decimal-pad'} onChangeText={(amount) => onChangeAmount(amount)} fontSize={16}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {{marginVertical: 10}}>
                    <TouchableOpacity onPress = {() => setCategoryModal(true)}>
                        <View style = {{flexDirection: 'row'}}>
                            <View  style = {{flex: 1}}>
                                    <Text style = {{fontSize: 20}}> Category </Text>
                            </View>
                            <Text>{newTransaction.category.name === null ? 'None' : newTransaction.category.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {{marginVertical: 10}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                        <View  style = {{flex: 1, justifyContent: 'center'}}>
                            <Text style = {{fontSize: 20}}> Description </Text>
                        </View>
                        <TextInput placeholder={'None'} style = {{padding: 0, margin: 0}} placeholderTextColor = {'black'} onChangeText = {(merchant) => onChangeMerchant(merchant)}/>
                    </View>
                </View>
                <View style = {{marginVertical: 10}}>
                    <TouchableOpacity onPress = {() => setCalendarModal(true)} >
                        <View style = {{flexDirection: 'row'}}>
                            <View style = {{flex: 1}} >
                                <Text style = {{fontSize: 20}}> Date </Text>
                            </View>
                            <Text>
                                {newTransaction.date === null ? 'None' : newTransaction.date}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flexDirection: 'row'}}>
                <TouchableOpacity style = {{flex: 1}} onPress = {() => navigation.goBack()}>
                    <Icon name='close' type='material-community'/>
                </TouchableOpacity>  
                <TouchableOpacity style = {{flex: 1}} onPress = {() => onAddTransactionHandler()}>
                    <Icon name='check' type='material-community'/>
                </TouchableOpacity>  
            </View>
            <Modal isVisible = {categoryModal} style = {{margin:0}} onSwipeComplete = {() => setCategoryModal(false)} onBackdropPress = {() => setCategoryModal(false)}>
                <View style = {{flex: 1, justifyContent : 'center', alignItems : 'center'}}>
                     <View style = {{ width: '85%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 30, alignItems: 'center', paddingVertical: 10, flexDirection: 'column', margin: 0}}>
                        <Text style = {{fontSize: 24, fontWeight: 'bold', padding: 10}}>Select Category</Text>
                        <View style= {{ flexWrap: 'wrap', flexDirection: 'row'}}>
                        {selectedCreditCard.cashbacks.map((category, index) => {return (
                            <View style = {{alignItems: 'center', width: '33%', height: 80, padding: 5, justifyContent: 'center'}} key = {index}>
                                <View style = {[{width  : '95%', height: '95%', borderRadius:5, backgroundColor: '#D3D3D3', justifyContent: 'center', alignItems: 'center'}]}>
                                    <TouchableOpacity onPress = {() => {onSelectCategory(category)}}>
                                        <Icon name ={category.icon.name} type={category.icon.type}/>
                                        <Text style = {{textAlign: 'center', fontSize: 10}}>{category.eligibility}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )})}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
    
}

export default AddTransaction