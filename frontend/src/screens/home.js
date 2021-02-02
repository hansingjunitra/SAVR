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

const cardList = require('../creditCards.json');

const Home = ({navigation}) => {


    const [retrieve, setRetrieve] = React.useState(true);

    React.useEffect(() => {
        const getTransactionHistory = async () => {
            try {
                const transactionHistoryString = await AsyncStorage.getItem('transactionHistory');
                const transactionHistory = JSON.parse(transactionHistoryString);
                setTransactionList(transactionHistory);
            } catch (e) {
                console.error(e)
            }
        }
        
        if (retrieve) {
            getTransactionHistory();
            setRetrieve(false);
        }
    }, [retrieve]);

    const [transactionList, setTransactionList] = React.useState(
       []
    )

    const [modalView, setModalView] = React.useState(null)
    const [newTransaction, setNewTransaction] = React.useState({
        card: null,
        amount: null,
        date: null,
        merchant: null,
        category: null
    })

    const setTransactionHistory = async () => {
        try {
            setTransactionList((prevState) => 
                [
                    {   
                        merchant: newTransaction.merchant, 
                        card: newTransaction.category,
                        amount: newTransaction.amount, 
                        date: newTransaction.date.format('DD MMM')
                    },
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
                amount: amount
            }});
        },
        setDate:  (date) => {
            setNewTransaction((prevState) => { 
            return {
                ...prevState,
                date: date
            }});
        },
        setCategory:  (category) => {
            setNewTransaction((prevState) => { 
            return {
                ...prevState,
                category: category
            }});
        },
        setMerchant:  (merchant) => {
            setNewTransaction((prevState) => { 
            return {
                ...prevState,
                merchant: merchant
            }});
        },
        addTransaction: () => {
            

            setTransactionHistory().then(console.log('hello'))
            console.log(transactionList)
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
                                {transactionList.map((transaction, index) => {
                                    return <TranscationCard key = {index} transaction = {transaction}/>
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View style = {{marginBottom: 10}}>
                        <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'flex-end'} } onPress = {() => setModalView(0)}>
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