import React, { createRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Touchable } from 'react-native';

import {TransactionContext} from '../context';
import {EditTransaction} from './editTransaction';

const TransactionEntry = (props) => {
    const {transaction, route, navigation} = props.props
    return (
        <TouchableOpacity onPress = {()=> navigation.navigate("EditTransactionScreen", transaction)}>
            <View style ={{margin: 10}}>
                <Text>Amount: {transaction.amount}</Text>
                <Text>Category: {transaction.category}</Text>
                <Text>Date: {transaction.date}</Text>
                <Text>Description: {transaction.description}</Text>
                <Text>Merchant: {transaction.merchant}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const ExpenseTracker = ({route, navigation}) => {
    console.log('Render ExpenseTracker.js');
    const {getTransactionList, addTransaction, deleteTransaction, flushTransactions} = React.useContext(TransactionContext);

    const [refresh, setRefresh] = React.useState(false);
    // transcationList.push();
    const transactionList = getTransactionList().sort((a, b) => new Date(b.date) - new Date(a.date))
    // Sort by date
    // Show header

    if (refresh) {
        setRefresh(false);
    }

    return (
        <View style= {{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <Text style = {{fontSize: 40}}>Expense Tracker</Text>
            <View style = {{height: 50}}>
                <TouchableOpacity onPress = {() => setRefresh(true)}>
                    <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 20}}>Refresh</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {{height: 50}}>
                <TouchableOpacity onPress = {() => flushTransactions()}>
                    <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 20}}>Flush</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style ={{flex:1}}>
                {transactionList.map((transaction, index) => {
                    return (    
                        <TransactionEntry props={{transaction: transaction, route: route, navigation: navigation}} key ={index}/>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    button1: {
        padding: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        margin: 10,
        backgroundColor:'#8f4fbd',
        alignItems: 'center'
    }
})