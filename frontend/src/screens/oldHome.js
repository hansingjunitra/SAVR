import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, Alert, KeyboardAvoidingView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Swiper from 'react-native-swiper';
import { Icon, Image } from 'react-native-elements';
import Modal from 'react-native-modal'

import TranscationCard from '../components/transactionCard';
import CardCard from '../components/cardCard';

import TransactionSummary from '../modal/home/transactionSummary';
import SelectCategory from '../modal/home/selectCategory';
import SelectDate from '../modal/home/selectDate';
import SpendingDetails from '../modal/home/spendingDetails';
import SelectCard from '../modal/home/selectCard';

import NewTransactionContext from '../util/newTransactionContext';
import { CreditCardRecordContext, TransactionRecordContext } from '../util/context';

import  TransactionCard from '../components/transactionCard';
import { Swipeable } from 'react-native-gesture-handler';

const cardList = require('../creditCards.json');

const Home = ({navigation}) => {

    const { addTransaction, deleteTransaction, getTransactionList, updateInternalStorage } = React.useContext(TransactionRecordContext);
    const [modalView, setModalView] = React.useState(null)
    const [newTransaction, setNewTransaction] = React.useState({
        id: null,
        merchant: null,
        category: null,
        amount: {
                value : null,
                currency : {
                    symbol : "S$",
                    code: 'SGD'
                }
            },
        date: null,
        card: null
    })

    const setTransactionHistory = async () => {
        addTransaction(newTransaction);
    }

    const setNewTransactionCardHandler = (card) => {
        console.log('updated', newTransaction)
    }

    // Adding new transaction context, state is shared between different components
    const newTransactionContext = React.useMemo(() => ({
        setModal: (modal) => {
            setModalView(modal)
        },
        setCard: (card) => {
            setNewTransaction(prevState => {
                return {
                    ...prevState,
                    card: card
                }
            })
        },
        setAmount:  (amount) => {
            setNewTransaction((prevState) => { 
            return {
                ...prevState,
                amount: {
                    ...prevState.amount,
                    value: amount
                }
            }});
            console.log(newTransaction);
        },
        setDate:  (date) => {
            setNewTransaction((prevState) => { 
            return {
                ...prevState,
                date: date
            }});
        },
        setMerchant:  (merchant) => {
            setNewTransaction((prevState) => { 
                return {
                    ...prevState,
                    merchant: merchant
                }});
        },
        setCategory:  (category) => {
            setNewTransaction((prevState) => { 
            return {
                ...prevState,
                category: category
            }});
        },
        setId: () => {
            setNewTransaction((prevState) => {
                return {
                    ...prevState,
                    id: Math.random()
                }
            })
        },
        addTransactionHandler: () => {
            console.log(newTransaction);
            // addTransaction(newTransaction);
            // updateInternalStorage();
        }
    }))
    
    const setModalViewHandler = (modal) => {
        switch (modal) {
            case 0:
                return <SelectCard/>
            case 1:
                return <SpendingDetails summary = {newTransaction}/>
            case 2:
                return <SelectDate/>
            case 3:
                return <SelectCategory/>
            case 4:
                return <TransactionSummary summary = {newTransaction}/>
        }
    }

    const handleDelete = transaction => {
        // const ind  = transactionLi9tionList);
        const items = transactionList.filter(item => item.id !== transaction.id);
        setTransactionList(items);
    }

    return (
        <View style = {{flex : 1}}>
            <NewTransactionContext.Provider value = {newTransactionContext}>
                <View style = {{flex: 5, backgroundColor: '#edece8', }}>
                    <View style={{flex: 2}}>
                        <View style = {{alignItems : 'center', height: 40, justifyContent: 'center'}}>
                            <Text style = {{fontSize: 20}}>
                                My Cards
                            </Text>
                        </View>
                        <Swiper autoplayTimeout = {5} autoplay = {true}>
                            {cardList.map((card, index) => {
                                return (
                                    <View  key = {index} style = {{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                        <Image source = {{uri: card.image}} style={{height: 150, width: 250, borderRadius: 15}}/>
                                    </View>
                                )    
                            })}
                        </Swiper>
                    </View>
                
                    <View style ={{flex: 3, backgroundColor: '#edece8', paddingVertical: 15}}>
                        <View style = {{alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                            <Text style = {{fontSize: 16}}>
                                Transaction History
                            </Text>
                        </View>
                        <View>
                            <ScrollView>
                            {
                                <View>
                                    <View>
                                        {getTransactionList() === null ? 'No Transaction Recorded' : getTransactionList().map((transaction, index) => {
                                            return (
                                                <Swipeable renderRightActions = {() => (
                                                    <TouchableOpacity onPress = {() => {
                                                            handleDelete(transaction)
                                                        }}>                                              
                                                        <View style = {{width: 50, justifyContent: 'center', alignContent: 'center'}}>
                                                            <Icon  name = 'delete' type= 'materials'/>
                                                        </View>
                                                    </TouchableOpacity>
                                                    )}key = {index}>
                                                    <TransactionCard transaction = {transaction}/>    
                                                </Swipeable>   
                                            )
                                        })}
                                    </View>
                                </View>
                            }
                            </ScrollView>
                        </View>
                    </View>
                    <View style = {{marginBottom: 10}}>
                        <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'flex-end'} } onPress = {() => {setModalView(0)}}>
                            <View style ={{backgroundColor:'#8f4fbd', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20}}>
                                <Text style = {{color:'white'}}>+ New Spending</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal isVisible={modalView === null ? false : true} onSwipeComplete={() => setModalView(null)} swipeDirection="down" style ={{margin:0}}>
                    <KeyboardAvoidingView behavior = "height" enabled style = {{flex: 1, justifyContent: 'flex-end'}} keyboardVerticalOffset = {10}>
                        {setModalViewHandler(modalView)}
                    </KeyboardAvoidingView>
                </Modal>
            </NewTransactionContext.Provider>
        </View>
    )
}

export default Home;