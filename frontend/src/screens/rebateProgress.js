import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { CardContext, CredentialsContext, TransactionContext } from '../context';
import { ProgressBar, Colors } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';

import {createConnection, getConnectionAccounts, getCustomerConnections, getTransactions} from '../saltedge';

const cardDetailsJSON = require('../creditCards.json'); 

export const RebateProgress = () => {
    console.log('Render RebateProgress.js');
    const {getCredentials, getConnections, getAccounts} = React.useContext(CredentialsContext);
    const {getCardList, addCard, deleteCard, updateCardConnectionID, getCardConnectionAccount} = React.useContext(CardContext);
    const {fetchTransactions} = React.useContext(TransactionContext);

    React.useEffect( () => {
        console.log('Render RebateProgress.js UseEffect');
        getConnections();
        updateCardConnectionID();
    }, [])

    const [refresh, setRefresh] = React.useState(false);

    const credentials = getCredentials();
    const cardList = getCardList();

    const getProgress = (totalSpent, minmumSpending) => {
        if (minmumSpending == null || minmumSpending == 0) {
            return 1;
        }
        let value = totalSpent / minmumSpending

        if (value > 1) {
            return 1;
        } else {
            return value;
        }
    }

    const getCashback = (percentage, spent, cap) => {
        let value = percentage * spent
        if (cap !== null && value >= cap) {
            return (cap).toFixed(2)
        } else {
            return value.toFixed(2)
        }
    }

    const getTotalSpent = (card) => {
        let total = 0
        card.categories.map((category) => {
            total += card.spendingBreakdown[category.eligibility]
        })
        return total
    }

    const getBankSyncStatus = (bank) => {
        const connection = credentials.connectionIDList.find(connection => bank == connection.bank);
        if (connection != undefined) {
            return true;
        } else {
            return false;
        }
    }

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

    if (refresh) {
        setRefresh(false)
    }

    return (
        <ScrollView>
            <View style = {{flex: 1, backgroundColor:'white'}}>
                <View style = {{alignItems: 'flex-end', justifyContent: 'flex-end', margin: 10}}>
                    <TouchableOpacity onPress = {() => setRefresh(true)} style = {{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <Icon name = {'refresh'} type = {'font-awesome'} size={20} color= {'black'} borderRadius= {20}/>
                    </TouchableOpacity>
                </View>
                <View style = {{flex: 1 , alignItems: 'center'}}>
                    <Swiper autoplayTimeout = {10} autoplay = {true} showsPagination= {true}>
                        {getCardList().map((card, index) => {
                            let cardDetail = cardDetailsJSON.find(d => d.id == card.id);
                            card = {...cardDetail, ...card};
                            {/* console.log(card); */}
                            // If the bank exists in the credentials.connectionList -- then automatically try to fetch if card exist in the account.
                            getCardConnectionAccount(card);

                            return (
                                <View style = {{flex: 1, justifyContent: 'center'}} key ={index}>
                                    <View style = {{alignItems: 'center', flex: 2, justifyContent: 'center', }}> 
                                        <Image source = {{uri: cardDetail.image}} style = {{height: 120, width: 200, borderRadius: 10}}/>
                                        <Text style = {{fontSize: 18, padding :5, fontWeight: 'bold'}}>{cardDetail.card_name}</Text>
                                        <View style = {{alignItems: 'center'}}>
                                            <View style ={{height: 40, width: 200, borderRadius: 10}}>
                                                <ProgressBar progress={getProgress(card.totalSpent, card.minimum_spending)} color={card.color.quartenary} style = {{height: '100%', borderRadius: 20}}/>
                                                {/* <Text style = {{position:'absolute', right: 10, top: 10}}>${getTotalSpent(card)} / ${card.minimum_spending}</Text> */}
                                                <Text style = {{position:'absolute', right: 10, top: 10}}>${card.totalSpent} / ${card.minimum_spending}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style = {{flexDirection: 'row', paddingVertical: 10}}>
                                        <Text>Bank Sync Status: {getBankSyncStatus(card.bank) ? 'Sync' : 'Not Sync'}</Text>
                                        <TouchableOpacity style = {{flex: 1}}>
                                            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                                <Text style = {{fontSize: 14}}>Sync</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style = {{flexDirection: 'row', paddingVertical: 10}}>
                                        <Text>Account Sync Status: {card.saltEdge.iBankingSync ? 'Sync' : 'Not Sync'}</Text>
                                        <TouchableOpacity style = {{flex: 1}} onPress ={() => console.log(card)} >
                                            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                                <Text style = {{fontSize: 14}}>Sync</Text>
                                                <Text style = {{fontSize: 14}}>{card.saltEdge.iBankingSync}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style = {{height: 50, alignItems: 'center', justifyContent: 'center'}} flexDirection = 'row'>
                                        <TouchableOpacity onPress = {() => fetchTransactions(card.saltEdge.connectionID, card.saltEdge.accountID, card)} style = {{flex : 1}}>
                                            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                                <Text style = {{fontSize: 20}}>Fetch</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style= {{flexWrap: 'wrap', flexDirection:'row', flex: 3}}>
                                        {card.categories.map((category, index) => {
                                            return (
                                                <View key={index} style = {{width: '29%', height: '30%', alignItems: 'center', margin: '2%', borderWidth: 2, borderColor: 'grey', borderRadius: 10}}>
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
                                    {/* <Text>
                                        {JSON.stringify(card.saltEdge)}
                                    </Text> */}
                                </View>
                            )
                        })}
                    </Swiper>
                </View>
            </View> 
        </ScrollView>
    )
}