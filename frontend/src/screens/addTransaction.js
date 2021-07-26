import React from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, Image } from 'react-native';

import { Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal'
import { CardContext, TransactionContext } from '../context/context';

var moment = require('moment');
const cardDetailsJSON = require('../creditCards.json'); 

export const AddTransaction = ({route, navigation}) => {
    const {selectedCard, setRefresh} = route.params;
    const [selectedDate, setSelectedDate] = React.useState(moment());
    const [calendarModal, setCalendarModal] = React.useState(false);
    const [categoryModal, setCategoryModal] = React.useState(false);
    const [newTransaction, setNewTransaction] = React.useState({
        alias: null, 
        amount: 0, 
        cardID: selectedCard.id, 
        cardName: selectedCard.card_name, 
        category: null, 
        date: selectedDate.format("YYYY-MM-DD"), 
        description: null, 
        icon: null, 
        id: Math.floor(Math.random() * 1000000000000), 
        merchant: null
    })
    
    // const card = cardDetailsJSON.find(d => d.id == newTransaction.cardID);
    // const { updateTotalSpent } = React.useContext(CreditCardRecordContext);
    // const { addTransaction } = React.useContext(TransactionRecordContext);
    const { addTransaction } = React.useContext(TransactionContext);

    const onChangeAmount = (amount) => {
        if (parseInt(amount) !== null) {
            setNewTransaction(prevState => {return {
                ...prevState,
                amount:  parseInt(amount)
            }})
        } else {
            setNewTransaction(prevState => {return {
                ...prevState,
                amount: 0
            }})
        }
    }

    const onSelectCategory = (selectedCategory) => {
        setNewTransaction((prevState) => { return {
            ...prevState,
            category: selectedCategory.eligibility,
            icon: selectedCategory.icon
        }});
        setCategoryModal(false);
    }

    const onAddTransactionHandler = () => {
        addTransaction(newTransaction);
        // updateTotalSpent(selectedCard, newTransaction);
        setRefresh(true);
        navigation.goBack();
    }

    const onChangeDescription = (description) => {
        setNewTransaction(prevState => {return {
            ...prevState,
            description: description    
        }})
        // if (description !== null) {
        // } else {
        //     setNewTransaction(prevState => {return {
        //         ...prevState,
        //         description: null
        //     }})
        // }
    }

    const onChangeAlias = (alias) => {
        setNewTransaction(prevState => {return {
            ...prevState,
            alias: alias    
        }})
        // if (alias !== null) {
        // } else {
        //     setNewTransaction(prevState => {return {
        //         ...prevState,
        //         alias: null
        //     }})
        // }
    }

    return (
        <KeyboardAvoidingView style = {{margin: 15, flex: 1}}>
            <View style = {{flex: 3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Image source = {{uri: selectedCard.image}} style = {{height: 160, width: 240, borderRadius: 20}}></Image>
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
                            <Text>{newTransaction.category === null ? 'None' : newTransaction.category}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {{marginVertical: 10}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                        <View  style = {{flex: 1, justifyContent: 'center'}}>
                            <Text style = {{fontSize: 20}}> Description </Text>
                        </View>
                        <TextInput placeholder={'None'} style = {{padding: 0, margin: 0}} placeholderTextColor = {'black'} onChangeText = {(description) => onChangeDescription(description)}/>
                    </View>
                </View>
                <View style = {{marginVertical: 10}}>
                    <TouchableOpacity onPress = {() => setCalendarModal(true)} >
                        <View style = {{flexDirection: 'row'}}>
                            <View style = {{flex: 1}} >
                                <Text style = {{fontSize: 20}}> Date </Text>
                            </View>
                            <Text>
                                {newTransaction.date === null ? 'None' : newTransaction.date.toString()}
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
                        {selectedCard.categories.map((category, index) => {return (
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
        </KeyboardAvoidingView>
    )
    
}