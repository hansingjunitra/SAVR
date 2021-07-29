import React, { useContext, useEffect, useRef, useState } from 'react';
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

export const RebateProgress = () => {
    console.log('Render RebateProgress.js');

    const { state, dispatch } = useContext(AppContext);
    const [cardList, setCardList] = useState([]);
    console.log(state.transactionList[0])

    useEffect(() => {
        setCardList(state.cardList)
    }, [state.cardList])

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
    if (state.cardList.length == 0) {
        return (
            <View style = {{flex: 1, justifyContent: 'center' , alignContent: 'center', margin: 20}}>
                <Text style = {{fontSize: 18, textAlign: 'center'}}>You don't have any cards! Go to Profile Tab and add a card!</Text>
            </View>
        )
    } 



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


           {/* <ScrollView>
                <SafeAreaView style = {{flex: 1, backgroundColor:'white'}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between' ,paddingHorizontal: 10, marginVertical: 2}}>
                        <TouchableOpacity onPress = {() => ref.current.setModalVisibility(true)} style = {{alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                            <Icon name = {'wallet'} type = {'entypo'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => setRefresh(true)} style = {{alignSelf: 'flex-end', justifySelf: 'flex-end'}}>
                            <Icon name = {'refresh'} type = {'font-awesome'} size={20} color= {'black'} borderRadius= {20}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex: 1 , alignItems: 'center'}}>
                        <Swiper ref={component => swiperObj = component} loop={true} autoplayTimeout = {10} autoplay = {false} showsPagination= {true} paginationStyle={{bottom: undefined, left: undefined, top: -100, right: 0}} style = {{alignSelf: 'flex-start'}}>
                            {cardList.map((card, index) => {
                                let cardDetail = cardDetailsJSON.find(d => d.id == card.id);
                                card = {...cardDetail, ...card};
                                // If the bank exists in the credentials.connectionList -- then automatically try to fetch if card exist in the account.
                                getCardConnectionAccount(card);
                                
                                var realisedRebates = 0;
                                try {
                                    realisedRebates = rebateFuncMap[cardDetail.card_name](card);
                                    unrealisedRebates = rebateFuncMap[cardDetail.card_name](card, 1);
                                }
                                catch (err) {
                                    console.log(err)
                                    console.log(cardDetail.card_name, "Card not found")
                                }

                                return (
                                    <View style = {{flex: 1, justifyContent: 'center',}} key ={index}>
                                        <View style = {{alignItems: 'center', flex: 2, justifyContent: 'center',}}> 
                                            <Image source = {{uri: cardDetail.image}} style = {{height: 120, width: 200, borderRadius: 10}}/>
                                            <Text style = {{fontSize: 18, padding :5, fontWeight: 'bold'}}>{cardDetail.card_name}</Text>
                                            <View style = {{alignItems: 'center'}}>
                                                <View style ={{height: 40, width: 200, borderRadius: 10}}>
                                                    <ProgressBar progress={getProgress(card.totalSpent, card.minimum_spending)} color={card.color.quartenary} style = {{height: '100%', borderRadius: 20}}/>
                                                    <Text style = {{position:'absolute', right: 10, top: 10}}>${card.totalSpent} / ${card.minimum_spending}</Text>
                                                </View>
                                            </View>
                                            <Text style = {{fontSize: 12, marginTop :5, fontWeight: 'bold'}}>Current Total Rebate: ${realisedRebates.toFixed(2)} / ${card.maximum_rebates}</Text>
                                        </View>
                                        <View style= {{height:80,}}>

                                            {
                                                getBankSyncStatus(card.bank) ? 
                                                <View style = {{alignItems: 'center', marginBottom:20}}>
                                                    {/* <Text style= {{margin: 10, textAlign:'center', fontSize: 12}}>You have not synced your iBanking account for this card!</Text> */}
                                                    {/* <View style={{justifyContent: 'space-evenly'}} flexDirection = 'row'>
                                                        <View style = {{alignItems: 'center', justifyContent: 'center', flex:1}}>
                                                            <Text style={{height:20, fontSize: 12, margin: 10}}>Last Fetched: </Text>
                                                            <TouchableOpacity onPress = {() => fetchTransactions(card.saltEdge.connectionID, card.saltEdge.accountID, card)} style = {{padding: 5, marginHorizontal:10, borderRadius: 20, paddingHorizontal: 20, borderWidth: 2}}>
                                                                <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                                                    <Text style = {{fontSize: 14}}>Fetch</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style = {{alignItems: 'center', justifyContent: 'center', flex:1}}>
                                                            <Text style={{height:20, fontSize: 12, margin: 10}}>Last Refreshed: </Text>
                                                            <TouchableOpacity onPress = {() => refreshConnection(card.saltEdge.connectionID)} style = {{padding: 5, marginHorizontal:10, borderRadius: 20, paddingHorizontal: 20, borderWidth: 2}}>
                                                                <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                                                    <Text style = {{fontSize: 14}}>Refresh</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                                :
                                                <View style = {{alignItems: 'center', marginBottom:20}}>
                                                    <Text style= {{height: 20, margin: 10, textAlign:'center', fontSize: 12}}>You have not synced your iBanking account for this card!</Text>
                                                    <TouchableOpacity>
                                                        <View style = {{padding: 5, borderRadius: 20, paddingHorizontal: 20, borderWidth: 2, alignItems: 'center', justifyContent: 'center'}}>
                                                            <Text style = {{fontSize: 14}}>Sync</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>                                                
                                            }
                                        </View>
                                                
                                        <View style= {{flexWrap: 'wrap', flexDirection:'row', flex: 3,}}>
                                            {card.categories.map((category, index) => {
                                                return (
                                                    <View key={index} style = {{width: '29%', height: '30%', alignItems: 'center', margin: '2%', borderWidth: 2, borderColor: 'grey', borderRadius: 10, backgroundColor: 'white'}}>
                                                        <View style = {{flex: 1, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
                                                            <Text style = {{fontSize: 10, flex: 1}}>{category.eligibility}</Text>
                                                            <Icon name = {category.icon.name} type = {category.icon.type} size={15} color= {'black'} borderRadius= {10}/>
                                                        </View>
                                                        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                            <Text style = {{fontSize: 20, fontWeight:'bold'}}>${card.spendingBreakdown[category.eligibility]}</Text>
                                                        </View>
                                                        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                            <Text style = {{fontSize: 12, fontWeight:'bold'}}>Cashback: ${getCashback(category.percentage, card.spendingBreakdown[category.eligibility], category.cap)}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                )
                            })}
                        </Swiper>
                    </View>
                </SafeAreaView> 
            </ScrollView>
            <SelectCardModal ref = {ref} setSwiperHandler = {setSwiperHandler}/> */}