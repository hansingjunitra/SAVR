import React, { createRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Touchable } from 'react-native';

import {TransactionContext} from '../context';
import {EditTransaction} from './editTransaction';
import { Icon } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';

import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { SafeAreaView } from 'react-native';

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
    let latestDate = null
    let latestDay = null

    if (refresh) {
        setRefresh(false);
    }

    return (
            <SafeAreaView>
            {/* <Text style = {{fontSize: 40}}>Expense Tracker</Text> */}
            <View style = {{alignItems: 'center', justifyContent: 'space-between', flexDirection:'row', margin: 10}}>
                <TouchableOpacity style = {{width: 100, borderWidth: 2}} onPress = {() => flushTransactions()}>
                    <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 16}}>Flush</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => setRefresh(true)} style = {{alignItems: 'flex-end'}}>
                    <Icon name = {'refresh'} type = {'font-awesome'} size={20} color= {'black'} borderRadius= {20}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {transactionList.map((transaction, index) => {
                    let currentDate = new Date(transaction.date)
                    {/* console.log(currentDate.getDate()) */}
                    let currentMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(currentDate)
                    {/* let currentMonth = currentDate.getMonth(); */}
                    {/* let currentDay = currentDate.getDate(); */}
                    if (currentMonth != latestMonth) {
                    {/* if (currentMonth != latestMonth && currentDay != latestDate) { */}
                        {/* latestDate = currentDay */}
                        latestMonth = currentMonth
                        return (   
                            <View key ={index} style = {{flex: 1}}>
                                <Text style = {{fontSize: 14, margin: 10}}>{latestMonth} {currentDate.getFullYear()}</Text>
                                <TransactionEntry props={{transaction: transaction, route: route, navigation: navigation, setRefresh: setRefresh}} />
                            </View>
                        )
                    } else {
                        return (
                            <Swipeable renderRightActions = {() => (
                                                    <TouchableOpacity onPress = {() => {
                                                            console.log('swipe')
                                                        }}>                                              
                                                        <View style = {{width: 50, justifyContent: 'center', alignContent: 'center'}}>
                                                            <Icon  name = 'delete' type= 'materials' style={{justifyContent: 'center', alignContent: 'center'}}/>
                                                        </View>
                                                    </TouchableOpacity>
                                                    )} key = {index}>
                                <TransactionEntry props={{transaction: transaction, route: route, navigation: navigation, setRefresh: setRefresh}} key ={index}/>
                            </Swipeable>  
                        )
                            {/* <View key ={index} style = {{flex: 1}}> */}
                            {/* </View> */}
                    }
                })}
            </ScrollView>
            {/* <FAB style ={{position: 'absolute',margin: 16,right: 0,bottom: 0,}} small icon="plus" onPress={() => console.log('Pressed')}/> */}

            </SafeAreaView>
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