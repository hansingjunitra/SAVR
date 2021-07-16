import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

import {CardContext, TransactionContext} from '../context';
import {EditTransaction} from './editTransaction';
import {AddTransaction} from './addTransaction';
import { Icon } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';

import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { SafeAreaView } from 'react-native';
import { set } from 'react-native-reanimated';
// import Modal from 'react-native-modal';

export const ExpenseTracker = ({route, navigation}) => {
    console.log('Render ExpenseTracker.js');
    const {getTransactionList, addTransaction, deleteTransaction, flushTransactions} = React.useContext(TransactionContext);
    const {getCardList} = React.useContext(CardContext);
    const ref = React.useRef(null);
    const [refresh, setRefresh] = React.useState(false);
    const setRefreshHandler = () => {
        setRefresh(true);        
    }

    if (refresh) {
        setRefresh(false);
    }

    return (
            <SafeAreaView style = {{flex: 1}}>
            {/* <Text style = {{fontSize: 40}}>Expense Tracker</Text> */}
                <View style = {{alignItems: 'center', justifyContent: 'space-between', flexDirection:'row', margin: 10}}>
                    <TouchableOpacity style = {{width: 100, borderWidth: 2}} onPress = {() => flushTransactions()}>
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style = {{fontSize: 16}}>Flush</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{width: 100, borderWidth: 2}} onPress = {() => ref.current.setModalVisibility(true)}>
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style = {{fontSize: 16}}>Add</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => setRefresh(true)} style = {{alignItems: 'flex-end'}}>
                        <Icon name = {'refresh'} type = {'font-awesome'} size={20} color= {'black'} borderRadius= {20}/>
                    </TouchableOpacity>
                </View>
                <TransactionScrollView props = {{route: route, setRefresh: setRefresh}} navigation = {navigation}/>
                <SelectCardModal ref = {ref} navigation = {navigation} props= {{setRefresh: setRefresh}}/>
            {/* <FAB style ={{position: 'absolute',margin: 16,right: 0,bottom: 0,}} small icon="plus" onPress={() => console.log('Pressed')}/> */}
        </SafeAreaView>
    )
}

const TransactionScrollView = ({props, navigation}) => {
    console.log("Render Scroll View")

    const {route, setRefresh} = props;
    const {getTransactionList, addTransaction, deleteTransaction, flushTransactions} = React.useContext(TransactionContext);
    const transactionList = getTransactionList().sort((a, b) => new Date(b.date) - new Date(a.date));
    // Sort by date
    // Show header
    let latestMonth = null
    let latestDate = null
    let latestDay = null

    return (
        <ScrollView>
            {transactionList.map((transaction, index) => {
                let currentDate = new Date(transaction.date)                 
                let currentMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(currentDate)
                if (currentMonth != latestMonth) {
                    latestMonth = currentMonth
                    return (   
                        <View key ={index} style = {{flex: 1}}>
                            <Text style = {{fontSize: 14, margin: 10}}>{latestMonth} {currentDate.getFullYear()}</Text>
                            {/* <TransactionEntry navigation = {navigation} props={{transaction: transaction, route: route, setRefresh: setRefresh}} /> */}
                            <TransactionEntry props={{transaction: transaction, route: route, setRefresh: setRefresh}} navigation= {navigation}/>
                        </View>
                    )
                } else {
                    return (
                        <Swipeable renderRightActions = {() => (
                            <TouchableOpacity onPress = {() => { console.log('swipe')}}>
                                <View style = {{width: 50, justifyContent: 'center', alignContent: 'center', flex: 1}}>
                                    <Icon  name = 'delete' type= 'materials' style={{justifyContent: 'center', alignContent: 'center'}} size={30}/>
                                </View>
                            </TouchableOpacity>
                                )} key = {index}>
                            <TransactionEntry props={{transaction: transaction, route: route, setRefresh: setRefresh}} navigation= {navigation} key ={index}/>
                        </Swipeable>  
                    )
                }
            })}
        </ScrollView>
    )
}

const TransactionEntry = ({props, navigation}) => {
    const {transaction, route, setRefresh} = props
    return (
        <TouchableOpacity onPress = {()=> navigation.navigate("EditTransactionScreen", {transaction:transaction, setRefresh:setRefresh})} style = {{backgroundColor:'white', margin: 3, marginHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 5,  elevation: 4, borderRadius: 20, height: 70, justifyContent: 'center'}}>
            <View style = {{flexDirection: 'row',}}>
                <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    <View>
                        <Icon name = {transaction.icon.name} type = {transaction.icon.type} size={20} color= {'white'} borderRadius= {25} iconStyle = {{padding:10 ,backgroundColor: transaction.icon.color, borderRadius: 20}}/>
                    </View>
                </View>
                <View style = {{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <Text numberOfLines={1}>{transaction.description}</Text>
                        <Text numberOfLines={1} style ={{color: 'grey'}}>{transaction.category}</Text>
                        <Text numberOfLines={1} style ={{color: 'grey'}}>{transaction.cardName}</Text>
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

const SelectCardModal = React.forwardRef(({props, navigation}, ref) => {
    const [modalVisibility, setModalVisibility] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null)

    const {setRefresh} = props;

    const {getCardList} = React.useContext(CardContext);
    const cardList = getCardList();
    React.useImperativeHandle(ref, () => {
        return {
            setModalVisibility: setModalVisibility,
            modalVisibility: modalVisibility
        }
    })

    return (
        <Modal animationType="none" transparent={true} visible={modalVisibility} onRequestClose={() => { Alert.alert("Modal has been closed.");   setModalVisibility(!modalVisibility); }}>
            <View style= {{flex: 1, justifyContent: "flex-end", alignItems: "center", }}>
                <TouchableWithoutFeedback onPress={()=> setModalVisibility(false)}>
                    <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}} />
                </TouchableWithoutFeedback>
                <View style={{width:"100%" , height: "70%", backgroundColor: "white",  borderTopRightRadius: 30,  borderTopLeftRadius: 30, paddingHorizontal: 25, paddingTop: 25, alignItems: "center", shadowColor: "#000", shadowOffset: {width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                    <View style = {{alignItems: 'center', marginBottom: 20}}>
                        <Text style = {{fontSize: 28}}>Select Card</Text>
                        <Text>Which card did you use for spending?</Text>
                    </View>
                    <ScrollView>
                        <View style = {{ alignContent: 'stretch',  flex: 1, flexWrap: "wrap",flexDirection: "row"} }>
                            {cardList.map((card, index) => {
                                return (
                                    <View style = {{width : '50%', padding: 5, height: 100}} key = {index}>
                                        <TouchableOpacity style = {[(selectedCard !== null) && (selectedCard.id === card.id) ? {borderWidth: 3, borderColor: card.color.quartenary, backgroundColor: card.colorCode, borderRadius: 15} : null]} onPress = {() => setSelectedCard(card)}>
                                        {/* <TouchableOpacity> */}
                                            <Image style = {{height: '100%', width: '100%', borderRadius: 10}} source = {{uri: card.image}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style = {{height: '15%', justifyContent: 'center', width: '40%'}}>
                        <TouchableOpacity style = {{margin:5, padding: 10, backgroundColor: '#2196F3', borderRadius: 10, alignItems: 'center'}} onPress = {() => {setModalVisibility(false); navigation.navigate('AddTransactionScreen', {selectedCard:selectedCard, setRefresh:setRefresh})}}>
                                <Text style = {{color: 'white'}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

const Card = ({card}) => {
    // console.log(card);
    return (
        <View style = {{width : '50%', padding: 5, height: 100}}>
            <TouchableOpacity style = {[(selectedCard !== null) && (selectedCard.id === card.id) ? {borderWidth: 3, borderColor: card.color.quartenary, backgroundColor: card.colorCode, borderRadius: 15} : null]} onPress = {() => setSelectedCard(card)}>
            {/* <TouchableOpacity> */}
                <Image style = {{height: '100%', width: '100%', borderRadius: 10}} source = {{uri: card.image}}></Image>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  