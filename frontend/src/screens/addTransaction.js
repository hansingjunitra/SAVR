import React, { useContext } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, Image } from 'react-native';

import { Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal'
import { AppContext } from '../context/context';

var moment = require('moment');
const cardDetailsJSON = require('../creditCards.json'); 

export const AddTransaction = ({route, navigation}) => {
    const {selectedCard} = route.params;
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

    const { state, dispatch } = useContext(AppContext);
    
    const onAddTransactionHandler = () => {
        
        switch (true) {
            case (newTransaction.amount === null || newTransaction.amount == 0):
                Alert.alert (
                    "Invalid Amount Spent",
                    "Please key in Amount Spent",
                    [
                        { text: "OK" }
                    ]
                )
                break;
            case (newTransaction.category === null):
                Alert.alert (
                    "Invalid Category",
                    "Please select a Category for the transaction",
                    [
                        { text: "OK" }
                    ]
                )
                break;
            case (newTransaction.descriptipon === null):
                Alert.alert (
                    "Invalid Description",
                    "Please key in a proper descrition for the transaction",
                    [
                        { text: "OK" }
                    ]
                )
                break;
            default:
                const card = state.cardList.find((c) => c.id == newTransaction.cardID)
                const transactionDate = new Date (newTransaction.date)
                const today = new Date()
        
                let updatedTotalSpent = card.totalSpent;
                let updatedSpendingBreakdown = card.spendingBreakdown;
        
                if (today.getMonth() == transactionDate.getMonth() && today.getFullYear() == transactionDate.getFullYear()) {
                    updatedTotalSpent += newTransaction.amount;
                    updatedSpendingBreakdown[`${newTransaction.category}`] += newTransaction.amount
                }
        
                let updatedCard = {
                    ...card,
                    totalSpent: updatedTotalSpent,
                    spendingBreakdown: updatedSpendingBreakdown
                }
        
                dispatch({type: "ADD_TRANSACTION", data: newTransaction});
                dispatch({type: "UPDATE_CARD", data: updatedCard});
                
                navigation.goBack();
        }
    }

    const onChangeDescription = (description) => {
        setNewTransaction(prevState => {return {
            ...prevState,
            description: description    
        }})
    }

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

   
    return (
        <KeyboardAvoidingView style = {{flex:1, paddingBottom: 30}}>
            {/* <ScrollView  style = {{margin: 15, flex: 1, paddingBottom: 10, backgroundColor: 'red'}}> */}
                <View style = {{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Image source = {{uri: selectedCard.image}} style = {{height: 160, width: 240, borderRadius: 20}}></Image>
                </View>
                <View style = {{flex: 3, marginHorizontal: 15, justifyContent:'center'}}>
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
                    <View  style = {{justifyContent: 'center'}}>
                            <Text style = {{fontSize: 20}}> Description </Text>
                        </View>
                        <TextInput placeholder={'None'}
                                    style = {{padding: 0, margin: 0, textAlign: 'right'}} 
                                    defaultValue = {newTransaction.description}
                                    placeholderTextColor = {'black'} onChangeText = {(description) => onChangeDescription(description)}/>
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
            {/* </ScrollView> */}
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