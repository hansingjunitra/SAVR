import React, { useContext } from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import { CardContext, CredentialsContext, TransactionContext } from '../context';
import { ProgressBar, Colors } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';

import {createConnection, getConnectionAccounts, getCustomerConnections, getTransactions} from '../saltedge';
import { SafeAreaView } from 'react-native';
import {rebateFuncMap} from '../util/rebateCalculation'

const cardDetailsJSON = require('../creditCards.json'); 

export const RebateProgress = () => {
    console.log('Render RebateProgress.js');
    const {getCredentials, getConnections, getAccounts, refreshConnection } = React.useContext(CredentialsContext);
    const {getCardList, addCard, deleteCard, updateCardConnectionID, getCardConnectionAccount, cardList} = React.useContext(CardContext);
    const {fetchTransactions, getTransactionList, flushTransactions} = React.useContext(TransactionContext);

    React.useEffect( () => {
        console.log('Render RebateProgress.js UseEffect');
        getConnections();
        updateCardConnectionID();
    }, [])

    const [refresh, setRefresh] = React.useState(false);
    const ref = React.useRef(null);

    const credentials = getCredentials();
    let swiperObj
    const setSwiperHandler = (i) => {
        swiperObj.scrollTo(i)
    }

    // const cardList = getCardList();

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
        <SafeAreaView>
            <ScrollView>
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
                                {/* console.log(card); */}
                                card = {...cardDetail, ...card};
                                // If the bank exists in the credentials.connectionList -- then automatically try to fetch if card exist in the account.
                                getCardConnectionAccount(card);
                                
                                var realisedRebates = 0;
                                try {
                                    realisedRebates = rebateFuncMap[cardDetail.card_name](card);
                                    unrealisedRebates = rebateFuncMap[cardDetail.card_name](card, 1);
                                    {/* console.log(realisedRebates, unrealisedRebates, cardDetail.card_name) */}
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
                                                    {/* <Text style = {{position:'absolute', right: 10, top: 10}}>${getTotalSpent(card)} / ${card.minimum_spending}</Text> */}
                                                    <Text style = {{position:'absolute', right: 10, top: 10}}>${card.totalSpent} / ${card.minimum_spending}</Text>
                                                    {/* <ProgressBar progress={getProgress(totalSpend, card.minimum_spending)} color={card.color.quartenary} style = {{height: '100%', borderRadius: 20}}/> */}
                                                    {/* <Text style = {{position:'absolute', right: 10, top: 10}}>${getTotalSpent(card)} / ${card.minimum_spending}</Text> */}
                                                </View>
                                            </View>
                                            <Text style = {{fontSize: 12, marginTop :5, fontWeight: 'bold'}}>Current Total Rebate: ${realisedRebates.toFixed(2)} / ${card.maximum_rebates}</Text>
                                        </View>
                                        <View style= {{height:80,}}>

                                            {
                                                getBankSyncStatus(card.bank) ? 
                                                <View style = {{alignItems: 'center', marginBottom:20}}>
                                                    {/* <Text style= {{margin: 10, textAlign:'center', fontSize: 12}}>You have not synced your iBanking account for this card!</Text> */}
                                                    <View style={{justifyContent: 'space-evenly'}} flexDirection = 'row'>
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
                                                
                                        {/* <View style = {{flexDirection: 'row', paddingVertical: 10}}>
                                            <Text>Bank Sync Status: {getBankSyncStatus(card.bank) ? 'Sync' : 'Not Sync'}</Text>
                                        </View> */}
                                        {/* <View style = {{flexDirection: 'row', paddingVertical: 10}}>
                                            <Text>Account Sync Status: {card.saltEdge.iBankingSync ? 'Sync' : 'Not Sync'}</Text>
                                            <TouchableOpacity style = {{flex: 1}} onPress ={() => console.log(card)} >
                                                <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style = {{fontSize: 14}}>Sync</Text>
                                                    <Text style = {{fontSize: 14}}>{card.saltEdge.iBankingSync}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View> */}
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
            <SelectCardModal ref = {ref} setSwiperHandler = {setSwiperHandler}/>
        </SafeAreaView>
    )
}

const SelectCardModal = React.forwardRef((props, ref) => {
    const { getCardList } = useContext(CardContext);
    const [modalVisibility, setModalVisibility] = React.useState(false);
    const {setSwiperHandler} = props;
    const cardList = getCardList();
    const [selectedCardIndex, setSelectedCardIndex] = React.useState(null);
    React.useImperativeHandle(ref, () => {
        return {
            setModalVisibility: setModalVisibility,
            modalVisibility: modalVisibility
        }
    })   
    
    const selectCardHandler = (index) => {
        setModalVisibility(false); 
        setSwiperHandler(index + 1);
        setSelectedCardIndex(null);
    }
    
    return (
        <Modal animationType="none" transparent={true} visible={modalVisibility} onRequestClose={() => { Alert.alert("Modal has been closed.");   setModalVisibility(!modalVisibility); }}>
            <View style= {{flex: 1, justifyContent: "flex-end", alignItems: "center", }}>
                <TouchableWithoutFeedback onPress={()=> setModalVisibility(false)}>
                    <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}} />
                </TouchableWithoutFeedback>
                <View style={{width:"100%" , height: "70%", backgroundColor: "white",  borderTopRightRadius: 30,  borderTopLeftRadius: 30, paddingHorizontal: 25, paddingTop: 25, alignItems: "center", shadowColor: "#000", shadowOffset: {width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                    <View style = {{alignItems: 'center', marginBottom: 20}}>
                        <Text style = {{fontSize: 28}}>Your Wallet</Text>
                    </View>
                    <ScrollView>
                        <View style = {{ alignContent: 'stretch',  flex: 1, flexWrap: "wrap",flexDirection: "row"} }>
                            {cardList.map((card, index) => {
                                return (
                                    <View style = {{width : '50%', padding: 5, height: 100}} key = {index}>
                                        <TouchableOpacity style = {[(selectedCardIndex !== null) && (selectedCardIndex === index) ? {borderWidth: 3, borderColor: card.color.quartenary, backgroundColor: card.colorCode, borderRadius: 15} : null]} onPress = {() => selectCardHandler(index)}>
                                        {/* <TouchableOpacity> */}
                                            <Image style = {{height: '100%', width: '100%', borderRadius: 10}} source = {{uri: card.image}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
})