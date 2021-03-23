import React, { createRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';

import {TransactionContext} from '../context';

export const ExpenseTracker = () => {
    console.log('Render ExpenseTracker.js');
    const {getTransactionList, addTransation, deleteTransaction} = React.useContext(TransactionContext);
    const transactionList = getTransactionList();

    // transcationList.push();
    console.log(transactionList);
    // Sort by date
    // Show header

    return (
        <View style= {{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <Text style = {{fontSize: 40}}>Expense Tracker</Text>
            {console.log()}
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