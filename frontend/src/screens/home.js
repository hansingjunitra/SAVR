import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, Alert, TextInput } from 'react-native';

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

const Home = ({navigation}) => {

    const [transactionList, setTransactionList] = React.useState([
        {name: 'NTUC Fairprice', card: 'Groceries', amount: 81.65, date: '4 Jan'},
        {name: "McDonald's Singapore", card: 'Food & Beverage', amount: 12.65, date: '4 Jan'},
        {name: 'Amazon.sg', card: 'Online', amount: 241.65, date: '4 Jan'}    
    ])

    const cardList = [{bank: 'DBS', colorCode: '#000000', asset: 'dbs_live_fresh_card'}, {bank: 'UOB', colorCode: '#0c4f75', asset: 'uob_visa'}, {bank: 'OCBC', colorCode: '#d10022', asset: 'ocbc_365'}]

    const [modalView, setModalView] = React.useState(null)
    const [newTransaction, setNewTransaction] = React.useState({
        card: null,
        amount: null,
        date: null,
        category: null
    })

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
        addTransaction: () => {
            setTransactionList((prevState) => 
                [...prevState,
                    {   name: newTransaction.card.bank, 
                        card: newTransaction.category,
                        amount: newTransaction.amount, 
                        date: newTransaction.date.format('DD MMM')
                    }
                ]
            
            )
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
                                {/* <View>
                                    <Image source={require('./Capture.jpg')}></Image>
                                </View> */}
                                return <CardCard key = {index} card = {card}/>
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
                    <View style = {{flex: 1, justifyContent: 'flex-end'}}>
                        {setModalViewHandler(modalView)}
                    </View>               
                </Modal>
            </NewTransactionContext.Provider>
        </View>
    )
}

export default Home;