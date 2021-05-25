import React, { createRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Touchable } from 'react-native';

import {TransactionContext} from '../context';
import {EditTransaction} from './editTransaction';
import { Icon } from 'react-native-elements';

import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

const TransactionEntry = (props) => {
    const {transaction, route, navigation, setRefresh} = props.props
    const setRefreshHandler = () => {
        setRefresh(true);        
    }
    return (
        <TouchableOpacity onPress = {()=> navigation.navigate("EditTransactionScreen", {transaction:transaction, setRefresh:setRefresh})} style = {{backgroundColor:'white', margin: 3, marginHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 5,  elevation: 4, borderRadius: 20, height: 50, justifyContent: 'center'}}>
            <View style = {{flexDirection: 'row',}}>
                <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    <View>
                        <Icon name = {transaction.icon.name} type = {transaction.icon.type} size={20} color= {'white'} borderRadius= {25} iconStyle = {{padding:10 ,backgroundColor: transaction.icon.color, borderRadius: 20}}/>
                    </View>
                </View>
                <View style = {{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <Text numberOfLines={1}>{transaction.description}</Text>
                        <Text style ={{color: 'grey'}}>{transaction.category}</Text>
                    </View>
                </View>
                <View style = {{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                    <View style = {{flexDirection: 'column'}}>
                        <Text style = {{color: 'red', fontWeight:'bold'}}>${transaction.amount}</Text>
                        <Text>{transaction.date}</Text>
                    </View>
                </View>
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
    let latestMonth = null

    if (refresh) {
        setRefresh(false);
    }

    return (
        <View style= {{flex:1, justifyContent: 'center'}}>
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
                    let currentDate = new Date(transaction.date)
                    let currentMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(currentDate)
                    if (currentMonth != latestMonth) {
                        latestMonth = currentMonth
                        return (   
                            <View key ={index} style = {{flex: 1}}>
                                <Text style = {{fontSize: 14, margin: 10}}>{latestMonth} {currentDate.getFullYear()}</Text>
                                <TransactionEntry props={{transaction: transaction, route: route, navigation: navigation, setRefresh: setRefresh}} />
                            </View>
                        )
                    } else {
                        return (
                                <TransactionEntry props={{transaction: transaction, route: route, navigation: navigation, setRefresh: setRefresh}} key ={index}/>
                        )
                            {/* <View key ={index} style = {{flex: 1}}> */}
                            {/* </View> */}
                    }
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