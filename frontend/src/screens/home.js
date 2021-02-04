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

import  TransactionCard from '../components/transactionCard';
import { Swipeable } from 'react-native-gesture-handler';

const cardList = require('../creditCards.json');

const Home = ({navigation}) => {

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


    const [modalView, setModalView] = React.useState(null)
    const [newTransaction, setNewTransaction] = React.useState(null)

    // id: Math.random(),   
    // merchant: "McDonald's", 
    // category: { 
    //     id    : 3, 
    //     name  : "Dining", 
    //     icon  : "coffee",
    //     type  : "feather",
    //     color: "#de7300"
    // },
    // amount: {
    //     value : 7.3,
    //     currency : {
    //         symbol : "S$",
    //         code: 'SGD'
    //     }
    // }, 
    // date: moment().format("DD MMM YYYY")

    const setTransactionHistory = async () => {
        try {
            setTransactionList((prevState) => 
                [
                   newTransaction,
                    ...prevState
                ]
            
            );
            await AsyncStorage.setItem('transactionHistory', JSON.stringify(transactionList))
        } catch (e) {
            console.error(e)
        }
    }

    // Adding new transaction context, state is shared between different components
    const newTransactionContext = React.useMemo(() => ({
        setModal: (modal) => {
            setModalView(modal)
        },
        setCard:  (card) => {
            setNewTransaction((prevState) => { 
            return {
                ...prevState,
                card: card
            }});
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
        addTransaction: () => {
            setTransactionHistory()
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

    const [cardSwiperProps, setCardSwiperProps] = React.useState({
        autoplay: true,
        index: 0
    })

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
                        <Swiper autoplayTimeout = {5} autoplay = {cardSwiperProps.autoplay}>
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
                                retrieve ? (
                                    <View>
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
                                                        key = {index}>
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
                            </ScrollView>
                        </View>
                    </View>
                    <View style = {{marginBottom: 10}}>
                        <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'flex-end'} } onPress = {() => {setModalView(0); setNewTransaction(
                                                                            {
                                                        id: Math.random(),
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
                                                    }
                                                    )}}>
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