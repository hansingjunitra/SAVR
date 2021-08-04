import React, { useContext, useState } from 'react';
import { View, 
        Text,
        TouchableOpacity, ScrollView, StyleSheet, 
        Alert, 
        TextInput, 
        Image, 
        SafeAreaView } from 'react-native';

import { Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal'
import { AppContext, CardContext, TransactionContext } from '../context/context';
import { stringify } from 'uuid';

var moment = require('moment');

const cardDetailsJSON = require('../creditCards.json'); 

export const EditTransaction = ({route, navigation}) => {
    const { transaction } = route.params;
    console.log(transaction);
    
    const [newTransaction, setNewTransaction] = useState(transaction)
    const { state, dispatch } = useContext(AppContext);
    const card = state.cardList.find(d => d.id == transaction.cardID);
    const [ applyAll, setApplyAll ] = useState(false);


    const onChangeAmount = (amount) => {
        setNewTransaction(prevState => {return {
            ...prevState,
            amount:  amount
        }})
        // if (parseInt(amount) !== null) {
        //     setNewTransaction(prevState => {return {
        //         ...prevState,
        //         amount:  parseInt(amount)
        //     }})
        // } else {
        //     setNewTransaction(prevState => {return {
        //         ...prevState,
        //         amount: 0
        //     }})
        // }
    }

    const onSelectCategory = (selectedCategory) => {
        setNewTransaction((prevState) => { return {
            ...prevState,
            category: selectedCategory.eligibility,
            icon: selectedCategory.icon
        }});
        setCategoryModal(false);
    }

    const onEditTransactionHandler = async () => {
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
                // const card = state.cardList.find((c) => c.id == newTransaction.cardID)
                const transactionDate = new Date (newTransaction.date)
                const today = new Date()
        
                let updatedTotalSpent = card.totalSpent;
                let updatedSpendingBreakdown = card.spendingBreakdown;
                let amount = parseFloat(newTransaction.amount);

                // if (today.getMonth() == transactionDate.getMonth() && today.getFullYear() == transactionDate.getFullYear()) {
                if ((( transactionDate.getMonth() == 6  && transactionDate.getDate() > 21) ||  transactionDate.getMonth() == 7) && today.getFullYear() == transactionDate.getFullYear()) {                   
                // if ((( transactionDate.getMonth() == 6  && transactionDate.getDate() > 21) ||  transactionDate.getMonth() == 7) && today.getFullYear() == transactionDate.getFullYear()) { // for demo
                    updatedSpendingBreakdown[`${transaction.category}`] -= transaction.amount
                    updatedSpendingBreakdown[`${newTransaction.category}`] += amount
                    updatedTotalSpent += amount - transaction.amount;
                    console.log("DEBUG>>" ,updatedTotalSpent, updatedSpendingBreakdown)
                }
        
                let updatedCard = {
                    ...card,
                    totalSpent: updatedTotalSpent,
                    spendingBreakdown: updatedSpendingBreakdown
                }

                const AsyncCategoryAlert = () => {
                    return new Promise((resolve, reject) => {
                        Alert.alert(
                            "Edit Category",
                            "Apply for matching description?",
                            [
                                { text: "No", onPress: () => resolve(false)},
                                { text: "Apply", onPress : () =>  resolve(true)}
                            ],
                            {cancelable: false}
                        )
                    })
                }
                
                const userResponse = await AsyncCategoryAlert();
                if (userResponse) {
                    dispatch({type: "EDIT_CATEGORY", data: {description: newTransaction.description,
                        oldCategory: transaction.category,
                        newCategory: newTransaction.category,
                        icon: newTransaction.icon,
                        transactionId: transaction.id,
                        card: card}
                    })
                }
                navigation.goBack()
                dispatch({type: "EDIT_TRANSACTION", data: newTransaction});
                dispatch({type: "UPDATE_CARD", data: updatedCard});
            }
        // navigation.goBack();
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

    // const [selectedDate, setSelectedDate] = React.useState(moment());
    const [calendarModal, setCalendarModal] = React.useState(false);
    const [categoryModal, setCategoryModal] = React.useState(false);

    return (
        <SafeAreaView style = {{paddingBottom: 30, flex: 1}}>
            <View style = {{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Image source = {{uri: card.image}} style = {{height: 150, width: 240, borderRadius: 20}}></Image>
            </View>
            <View style = {{flex: 3, marginHorizontal: 15, justifyContent:'center'}}>
                <View style = {{marginVertical: 10}}>
                    <TouchableOpacity>
                        <View style = {{flexDirection: 'row'}}>
                            <View  style = {{flex: 1}}>
                                    <Text style = {{fontSize: 20}}> Amount </Text>
                            </View>
                            <TextInput defaultValue={newTransaction.amount.toString()} style = {{padding: 0, margin: 0, textAlign:'right'}} placeholderTextColor = {'black'} keyboardType={'decimal-pad'} onChangeText={(amount) => onChangeAmount(amount)} fontSize={16}/>
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
                                defaultValue = {transaction.description}
                                placeholderTextColor = {'black'} onChangeText = {(description) => onChangeDescription(description)}/>
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
                <TouchableOpacity style = {{flex: 1}} onPress = {() => onEditTransactionHandler()}>
                    <Icon name='check' type='material-community'/>
                </TouchableOpacity>  
            </View>
            <Modal isVisible = {categoryModal} style = {{margin:0}} onSwipeComplete = {() => setCategoryModal(false)} onBackdropPress = {() => setCategoryModal(false)}>
                <View style = {{flex: 1, justifyContent : 'center', alignItems : 'center'}}>
                     <View style = {{ width: '85%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 30, alignItems: 'center', paddingVertical: 10, flexDirection: 'column', margin: 0}}>
                        <Text style = {{fontSize: 24, fontWeight: 'bold', padding: 10}}>Select Category</Text>
                        <View style= {{ flexWrap: 'wrap', flexDirection: 'row'}}>
                        {card.categories.map((category, index) => {return (
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
        </SafeAreaView>
    )
    
}