import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';

import { Icon, Image } from 'react-native-elements';
import Modal from 'react-native-modal'
import TranscationCard from '../components/transactionCard';

import { CreditCardRecordContext, TransactionRecordContext, NewTransactionContext } from '../util/context';
import  TransactionCard from '../components/transactionCard';
import { Swipeable } from 'react-native-gesture-handler';

const moment = require('moment');

const Home = ({navigation}) => {

    var SendIntentAndroid = require("react-native-send-intent");
    const { getTransactionList, addTransaction, deleteTransaction, updateInternalStorage } = React.useContext(TransactionRecordContext);
    const { getCreditCardList } = React.useContext(CreditCardRecordContext);

    let refsList = [];
    let transactionList = getTransactionList();
    let creditCardList = getCreditCardList();

    const [modalVisiblity, setModalVisibility] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)

    // Handler function when user add a new transaction
    const addTransactionHandler = (transaction) => {
        addTransaction(transaction);
    }

    // Handler function when user remove an existing transaction
    const deleteTransactionHandler = (transaction) => {
        deleteTransaction(transaction);
        refsList.map((ref, index) => ref.close());
    }

    // Create context for the modals
    return ( 
        <View style= {{flex:1}}>
            <View style = {{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style = {styles.title}>Transaction History</Text>
            </View>
            <View style = {{flex: 8}}>
                <ScrollView style = {{flex: 1}}>
                    {
                        <View> 
                            {transactionList === null ? 'No Transaction Recorded' : transactionList.map((transaction, index) => {
                                return (
                                    <Swipeable ref = {(ref) => {refsList[index] = ref}} key= {index} renderRightActions = {() => ( 
                                        <TouchableOpacity onPress = {() => { deleteTransactionHandler(transaction)}}>
                                            <View style = {{width: 50, height: 50, margin:3, justifyContent: 'center', alignContent: 'center'}}>
                                                <Icon  name = 'delete' type= 'materials'/>
                                            </View>
                                        </TouchableOpacity>)} key = {index}>
                                        <TransactionCard transaction = {transaction}/> 
                                    </Swipeable>   
                            )})}
                        </View>
                    }
                </ScrollView>
            </View>
            <View style = {{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity onPress = {() => setModalVisibility(true)}>
                    <View style = {styles.button1}>
                        <Text style = {{color: 'white'}}>Add Transaction +</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal isVisible = {modalVisiblity} style = {{margin:0}} onSwipeComplete = {() => setModalVisibility(false)}>
                <View style = {{flex: 1, justifyContent: 'flex-end'}}>
                    <View style = {styles.modalViewContainer}>
                        <View style = {styles.titleContainer}>
                            <Text style = {{fontSize: 28}}>Select Card</Text>
                            <Text>Which card did you use for spending?</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator= {false}  onStartShouldSetResponder = {()=>true}>
                            <View style = {{ alignContent: 'stretch',  flex: 1, flexWrap: "wrap",flexDirection: "row"} }>
                            {creditCardList.map((card, index) => { return (
                                <View key = {index} style = {{width : '50%', padding: 5, height: 100}}>
                                    <TouchableOpacity style = {[(selectedCard !== null) && (selectedCard.id === card.id) ? {borderWidth: 3, borderColor: card.color.quartenary, backgroundColor: card.colorCode, borderRadius: 15} : null]} onPress = {() => setSelectedCard(card)}>
                                        <Image style = {{height: '100%', width: '100%', borderRadius: 10}} source = {{uri: card.image}}></Image>
                                    </TouchableOpacity>
                                </View>
                            )})}
                            </View>
                        </ScrollView>
                        <View style = {{height: '15%', justifyContent: 'center', width: '40%'}}>
                            <TouchableOpacity style = {{margin:10, padding: 10, backgroundColor: '#2196F3', borderRadius: 10, alignItems: 'center'}} onPress = {() => {setModalVisibility(false); navigation.navigate('AddTransaction', selectedCard)}}>
                                    <Text style = {{color: 'white'}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    modalViewContainer: {
        borderTopRightRadius: 30, 
        borderTopLeftRadius: 30,
        height: '75%',
        paddingHorizontal: 20, 
        paddingVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center', 
        height: '15%', 
        justifyContent: 'center'
    }
})

export default Home;