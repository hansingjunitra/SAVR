import React, { createRef } from 'react';
import  {View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {generateID} from '../util/util';

import  TransactionCard from '../components/transactionCard';
import { Swipeable } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';

const moment = require('moment');

const History = () => {

    const [retrieve, setRetrieve] = React.useState(false);
    const [transactionList, setTransactionList] = React.useState([])

    React.useEffect(() => {
        const getTransactionHistory = async () => {
            try {
                const transactionHistory = JSON.parse( await AsyncStorage.getItem('transactionHistory'));
                setTransactionList(transactionHistory);
            } catch (e) {
                console.error(e)
            }
        }
        
        if (!retrieve) {
            getTransactionHistory();
            setRetrieve(true);
        }
    }, [retrieve]);

    const deleteTransactionHistory = async () => {
        try {
            await AsyncStorage.setItem('transactionHistory', JSON.stringify([]))
            setTransactionList([])
        } catch(e) {
            console.error(e)
        }
    }

    const initTransactionHistory = async () => {
        try {
            setTransactionList((prevState) => 
                [
                    {
                        id: Math.random(),   
                        merchant: "McDonald's", 
                        category: { 
                            id    : 3, 
                            name  : "Dining", 
                            icon  : "coffee",
                            type  : "feather",
                            color: "#de7300"
                        },
                        amount: {
                            value : 7.3,
                            currency : {
                                symbol : "S$",
                                code: 'SGD'
                            }
                        }, 
                        date: moment().format("DD MMM YYYY")
                    },
                    ...prevState
                ]
            );
            await AsyncStorage.setItem('transactionHistory', JSON.stringify(transactionList));
        } catch (e) {
            console.error(e)
        }
    }

    const handleDelete = transaction => {
        const ind  = transactionList.indexOf(transaction);
        transactionList.splice(ind, 1);
        setTransactionList(transactionList);
        const items = transactionList.filter(item => item.id !== transaction.id);
        setTransactionList(items);
    }

    return (

        <View>
            <Text style = {styles.title}>Transaction History</Text>
            {
                retrieve ? (
                    <View>
                        <Text>Transaction History Screen</Text>
                        <View>
                            {transactionList === null ? 'No Transaction Recorded' : transactionList.map((transaction, index) => {
                                return (
                                    <Swipeable
                                        renderRightActions = {() => (
                                                                    <TouchableOpacity onPress = {() => {
                                                                            handleDelete(transaction)
                                                                        }}>                                              
                                                                        <View style = {{width: 50, justifyContent: 'center', alignContent: 'center'}}>
                                                                            <Icon  name = 'delete' type= 'materials'/>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    )}
                                        onSwipeableLeftOpen= {() => closeRow(index)} key = {index}>
                                        <TransactionCard transaction = {transaction}/>    
                                    </Swipeable>   
                                )
                            })}
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text>Retrieving</Text>
                    </View>
                )
            }
            <TouchableOpacity style = {styles.button1} onPress = {() => deleteTransactionHistory()}>
                <View style = {{marginHorizontal : 10}}>
                    <Text>Delete</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.button1} onPress = {() => initTransactionHistory()}>
                <View style = {{marginHorizontal : 10}}>
                    <Text>Init</Text>
                </View>
            </TouchableOpacity>
            
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