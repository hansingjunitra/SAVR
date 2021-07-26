import React, { useContext, useRef } from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import { AppContext, CardContext, CredentialsContext, TransactionContext } from '../context/context';
import { ProgressBar, Colors } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';

import {createConnection, getConnectionAccounts, getCustomerConnections, getTransactions} from '../saltedge';
import { SafeAreaView } from 'react-native';
import {rebateFuncMap} from '../util/rebateCalculation'
import { SwiperCardView } from '../components/swiperCardView';
import { WalletCardModal } from '../modal/walletCardModal';

const cardDetailsJSON = require('../creditCards.json'); 

const RebateProgress = () => {
    console.log('Render RebateProgress.js');

    const { state, dispatch } = useContext(AppContext);

    // const {getCredentials, getConnections, getAccounts, refreshConnection } = React.useContext(CredentialsContext);
    // const {getCardList, addCard, deleteCard, updateCardConnectionID, getCardConnectionAccount, cardList} = React.useContext(CardContext);
    // const {fetchTransactions, getTransactionList, flushTransactions} = React.useContext(TransactionContext);

    // React.useEffect( () => {
    //     console.log('Render RebateProgress.js UseEffect');
    //     getConnections();
    //     updateCardConnectionID();
    // }, [])

    // const [refresh, setRefresh] = React.useState(false);

    // const credentials = getCredentials();

    const ref = useRef(null);
    let swiperObj
    const setSwiperHandler = (i) => {
        swiperObj.scrollTo(i)
    }

    // // const cardList = getCardList();

    // const getBankSyncStatus = (bank) => {
    //     const connection = credentials.connectionIDList.find(connection => bank == connection.bank);
    //     if (connection != undefined) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // const fetchTransactions =  async (connectionID, accountID) => {
    //     const transactions = await getTransactions(connectionID, accountID);
    //     let parsedTransactions = []

    //     for (let i = 0; i < transactions.length; i++) {
    //         console.log(transactions[i])
    //         parsedTransactions.push(
    //             {
    //                 amount: transactions[i].amount,
    //                 category: transactions[i].category,
    //                 description: transactions[i].description,
    //                 date:   transactions[i].made_on,
    //                 merchant: transactions[i].extra.merchant_id
    //             }
    //         )
    //     }
                


    // }

    return (    
        <SafeAreaView style = {{flex: 1, backgroundColor:'white'}}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between' ,paddingHorizontal: 10, marginVertical: 2}}>
                <TouchableOpacity onPress = {() => ref.current.setModalVisibility(true)} style = {{alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                    <Icon name = {'wallet'} type = {'entypo'}/>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress = {() => setRefresh(true)} style = {{alignSelf: 'flex-end', justifySelf: 'flex-end'}}>
                    <Icon name = {'refresh'} type = {'font-awesome'} size={20} color= {'black'} borderRadius= {20}/>
                </TouchableOpacity> */}
            </View>
            <View style = {{flex: 1 , alignItems: 'center'}}>
                <Swiper ref={component => swiperObj = component} loop={true} autoplayTimeout = {10} autoplay = {false} showsPagination= {true} paginationStyle={{bottom: undefined, left: undefined, top: -100, right: 0}} style = {{alignSelf: 'flex-start'}}>
                    {state.cardList.map((card, index) => 
                        <SwiperCardView card = {card} key = {index}/>
                    )}
                </Swiper>
            </View>
            <WalletCardModal ref = {ref} setSwiperHandler = {setSwiperHandler}/>
        </SafeAreaView>
    )
}

export {
    RebateProgress
}