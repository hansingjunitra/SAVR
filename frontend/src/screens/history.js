import React, { createRef } from 'react';
import  {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {generateID} from '../util/util';

import  TransactionCard from '../components/transactionCard';
import { NativeViewGestureHandler, ScrollView, Swipeable } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';

import { TransactionRecordContext } from '../util/context';

const moment = require('moment');

const History = () => {
    var SendIntentAndroid = require("react-native-send-intent");
    const { getTransactionList, addTransaction, deleteTransaction, updateInternalStorage } = React.useContext(TransactionRecordContext);

    let refsList = [];
    let transactionList = getTransactionList();


    const setHandler = () => {
        setState((prevState) => [
            ...prevState.slice(0, 1),
            {
                ...prevState[1],
                totalSpent: 12
            },
            ...prevState.slice(2)
        ])
        
        console.log(state)
    }

    return (

        <View style= {{flex:1}}>
            <Text>History Screeh</Text>
            <Button onPress = {() => SendIntentAndroid.openApp("com.google.android.apps.nbu.paisa.user").then(wasOpened => {})} title = 'GPAY'>
            </Button> 
            <Button onPress = {() => SendIntentAndroid.openApp("com.samsung.android.spay").then(wasOpened => {})} title = 'Samsung Pay'>
            </Button> 
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

export default History;