import React, { createRef } from 'react';
import  {View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {generateID} from '../util/util';

import  TransactionCard from '../components/transactionCard';
import { ScrollView, Swipeable } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';

import { TransactionRecordContext } from '../util/context';

const moment = require('moment');

const History = () => {

    const { getTransactionList, addTransaction, deleteTransaction, updateInternalStorage } = React.useContext(TransactionRecordContext);

    const initTransactionHistory = () => {
        addTransaction(
            {
                id: Math.random(),   
                merchant: "Texas", 
                category: { 
                    id: Math.random(), 
                    name: "Dining", 
                    icon: "coffee",
                    type: "feather",
                    color: "#de7300"},
                amount: {
                    value : 9.7,
                    currency : {
                        symbol : "S$",
                        code: 'SGD'
                    }
                }, 
                date: moment().format("DD MMM YYYY")
            }
        );
    }

    return (

        <View>
            <ScrollView>

            <Text style = {styles.title}>Transaction History</Text>
            {
                    <View>
                        <View>
                            {getTransactionList() === null ? 'No Transaction Recorded' : getTransactionList().map((transaction, index) => {
                                return (
                                    <Swipeable key= {index} renderRightActions = {() => ( 
                                        <TouchableOpacity onPress = {() => { deleteTransaction(transaction)}}>                                              
                                            <View style = {{width: 50, justifyContent: 'center', alignContent: 'center'}}>
                                                <Icon  name = 'delete' type= 'materials'/>
                                            </View>
                                        </TouchableOpacity>)} key = {index}>
                                        <TransactionCard transaction = {transaction}/> 
                                    </Swipeable>   
                                )
                            })}
                        </View>
                    </View>
            }
            {/* <TouchableOpacity style = {styles.button1} onPress = {() => console.log(getTransactionList())}>
                <View style = {{marginHorizontal : 10}}>
                    <Text>Get</Text>
                </View>
            </TouchableOpacity> */}

            <TouchableOpacity style = {styles.button1} onPress = {() => initTransactionHistory()}>
                <View style = {{marginHorizontal : 10}}>
                    <Text>Init</Text>
                </View>
            </TouchableOpacity>
            
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
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        margin: 10
    }
})

export default History;