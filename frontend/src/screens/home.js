import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Swiper from 'react-native-swiper';
import { Icon, Image } from 'react-native-elements';
import Modal from 'react-native-modal'

import TranscationCard from '../components/transactionCard';
import CardCard from '../components/cardCard';

import { CreditCardRecordContext, TransactionRecordContext, NewTransactionContext } from '../util/context';

import  TransactionCard from '../components/transactionCard';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';

import TransactionSummary from '../modal/home/transactionSummary';
import SelectCategory from '../modal/home/selectCategory';
import SelectDate from '../modal/home/selectDate';
import SpendingDetails from '../modal/home/spendingDetails';
import SelectCard from '../modal/home/selectCard';

const moment = require('moment');

const Home = ({navigation}) => {

    const { addTransaction, deleteTransaction, getTransactionList } = React.useContext(TransactionRecordContext);

    let transactionList = getTransactionList();

    let refsList = [];

    const addTransactionHandler = () => {
        addTransaction({
            id: Math.random(),   
            merchant: "Uniqlo's", 
            category: { 
                id: 4, 
                name: "Beauty", 
                icon: "shirt", 
                type: "ionicon",
                color: "#d41dde"
            },
            amount: {
                value : Math.round(Math.random() * 10),
                currency : {
                    symbol : "S$",
                    code: 'SGD'
                }
            }, 
            date: moment().format("DD MMM YYYY")
        })
    }

    const deleteTransactionHandler = (transaction) => {
        deleteTransaction(transaction);
        refsList.map((ref, index) => ref.close());
    }

    const [newTransaction, setNewTransaction] = React.useState({
        id : null,
        card: null,
        merchant: null,
        category: {
            id : null,
            name: null,
            icon: null, 
            type: null,
            color: null
        },
        amount: {
            value: null,
            currency : {
                symbol : "S$",
                code: 'SGD'
            }
        },
        date: null
    });

    const setModalViewHandler = (modal) => {
        switch (modal) {
            case 1:
                return <SelectCard/>
            case 2:
                return <SpendingDetails summary = {newTransaction}/>
            case 3:
                return <SelectDate/>
            case 4:
                return <SelectCategory/>
            case 5:
                return <TransactionSummary summary = {newTransaction}/>
        }
    }

    const newTransactionContext = React.useMemo(() => {

    })

    const [modalView, setModalView] = React.useState(null);

    return ( 
        <View>
            <Text>Home Screen</Text>
            {transactionList.length !== 0 ? transactionList.map((transaction, index) => {
                return (
                    <Swipeable ref = {(ref) => {refsList[index] = ref}} renderRightActions = {() => (
                            <TouchableOpacity onPress = {() => { deleteTransactionHandler(transaction);}}>
                                <View style = {{width: 50, height: 50, margin:3, justifyContent: 'center', alignContent: 'center'}}>
                                    <Icon  name = 'delete' type= 'materials' size= {25}/>
                                </View>
                            </TouchableOpacity> )}key = {index}>
                        <TranscationCard key = {index} transaction = {transaction}/>
                    </Swipeable>
                )
            }) : <Text>There is no transaction recorded</Text>}
            <TouchableOpacity onPress = {() => navigation.navigate('AddTransaction')}>
                <View style = {styles.button1}>
                    <Text>Add</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button1: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        margin: 10
    }
})

export default Home;