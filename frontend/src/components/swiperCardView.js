import React, { useContext } from 'react';
import { View, 
        Text, 
        Image,
        TouchableOpacity,
        StyleSheet  } from 'react-native';
import { Icon } from 'react-native-elements';
import { ProgressBar, Colors } from 'react-native-paper';
import { AppContext } from '../context/context';
import { rebateFuncMap } from '../util/rebateCalculation';
import { refreshCustomerConnection } from '../saltedge';
import { fetchTransactions } from '../context/transactions';

const getProgress = (totalSpent, minmumSpending) => {
    if (!(minmumSpending == null || minmumSpending == 0)) {
        let value = totalSpent / minmumSpending
        if (value < 1) {
            return value;
        }
    }
    return 1;
}

const getCashback = (percentage, spent, cap) => {
    let value = percentage * spent
    if (cap !== null && value >= cap) {
        return (cap).toFixed(2)
    } else {
        return value.toFixed(2)
    }
}

const refreshConnectionHandler = async (connectionID) => {
    const res = await refreshCustomerConnection(connectionID);     
    return res;
}

const refreshButtonHandler = () => {
    console.log(card, state.connectionIDList);
    // Linking.openURL(res);   
}

const NoBankTextView = () => {
    return (
        <View style = {{alignItems: 'center', marginBottom:20}}>
            <Text style= {{height: 20, margin: 10, textAlign:'center', fontSize: 12}}>You have not synced your iBanking account for this card!</Text>
            <TouchableOpacity onPress = {refreshButtonHandler}>
                <View style = {{padding: 5, borderRadius: 20, paddingHorizontal: 20, borderWidth: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style = {{fontSize: 14}}>Sync</Text>
                </View>
            </TouchableOpacity>
        </View> 
    )
}

const NoCardTextView = () => {
    return (
        <View style = {{alignItems: 'center', marginBottom:20}}>
            <Text style= {{margin: 10, textAlign:'center', fontSize: 12}}>There is no such card in your Bank Account! Please contact us if this is not the case!</Text>
        </View> 
    )
}

const FetchAndRefreshView = (props) => {
    const { card } = props;
    const { state, dispatch } = useContext(AppContext);

    const fetchTransactionsButtonHandler = async (card, transactionList) => {
        const {updatedCard, updatedTransactionList} =  await fetchTransactions(card, transactionList);
        dispatch({type: 'UPDATE_CARD', data: updatedCard})
        dispatch({type: 'UPDATE_TRANSACTION_LIST', data: updatedTransactionList})
    }

    return (
        <View style = {{alignItems: 'center', marginBottom:20}}>
            <View style={{justifyContent: 'space-evenly'}} flexDirection = 'row'>
                <View style = {{alignItems: 'center', justifyContent: 'center', flex:1}}>
                    <Text style={{height:20, fontSize: 12, margin: 10}}>Last Fetched: </Text>
                    <TouchableOpacity onPress = {() => fetchTransactionsButtonHandler(card, state.transactionList)} style = {{padding: 5, marginHorizontal:10, borderRadius: 20, paddingHorizontal: 20, borderWidth: 2}}>
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style = {{fontSize: 14}}>Fetch</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {{alignItems: 'center', justifyContent: 'center', flex:1}}>
                    <Text style={{height:20, fontSize: 12, margin: 10}}>Last Refreshed: </Text>
                    <TouchableOpacity onPress = {refreshButtonHandler} style = {{padding: 5, marginHorizontal:10, borderRadius: 20, paddingHorizontal: 20, borderWidth: 2}}>
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style = {{fontSize: 14}}>Refresh</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>       
    )
}

const SwiperCardView = (props) => {
    const { state, dispatch } = useContext(AppContext);
    const { card } = props;
    let realisedRebates = 0;
    try {
        realisedRebates = rebateFuncMap[card.card_name](card);
        {/* unrealisedRebates = rebateFuncMap[cardDetail.card_name](card, 1); */}
    }
    catch (err) {
        console.log(err)
        console.log(card.card_name, "Card not found")
    }

    let progress = getProgress(card.totalSpent, card.minimum_spending)

    return (
        <View style = {style.mainContainer}>
            <View style = {style.cardContainer}> 
                <Image source = {{uri: card.image}} style = {style.cardImage}/>
                <Text style = {style.cardName}>{card.card_name}</Text>
                <View style = {style.progressContainer}>
                    <View style = {style.progressBarContainer}>
                        <ProgressBar progress={progress} color={card.color.quartenary} style = {style.progressBar}/>
                        <Text style = {style.progressBarText}>${card.totalSpent.toFixed(2)} / ${card.minimum_spending}</Text>
                    </View>
                </View>
                <Text style = {{fontSize: 12, marginTop :5, fontWeight: 'bold'}}>Current Total Rebate: ${realisedRebates.toFixed(2)} / ${card.maximum_rebates}</Text>
            </View>
            <View style= {{height:80,}}>
            { card.saltEdge.iBankingSync && card.saltEdge.accountID !== null ? <FetchAndRefreshView card = {card}/> : null }
            { card.saltEdge.iBankingSync && card.saltEdge.accountID === null ? <NoCardTextView/> : null }
            { !card.saltEdge.iBankingSync ? <NoBankTextView/> : null }
            </View>
            <View style= {style.categoryParentContainer}>
                {card.categories.map((category, index) => {
                    return (
                        <View key={index} style = {style.categoryContainer}>
                            <View style = {style.categoryDetailContainer}>
                                <Text style = {style.categoryDetailText}>{category.eligibility}</Text>
                                <Icon name = {category.icon.name} type = {category.icon.type} size={15} color= {'black'} borderRadius= {10}/>
                            </View>
                            <View style = {style.categorySpendingContainer}>
                                <Text style = {style.categorySpendingText}>${card.spendingBreakdown[category.eligibility].toFixed(2)}</Text>
                            </View>
                            <View style = {style.categoryCashbackContainer}>
                                <Text style = {style.categoryCashbackText}>Cashback: ${getCashback(category.percentage, card.spendingBreakdown[category.eligibility], category.cap)}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    cardContainer: {
        alignItems: 'center', 
        flex: 2, 
        justifyContent: 'center',
    },
    cardImage: {
        height: 120, 
        width: 200, 
        borderRadius: 10
    },
    cardName: {
        fontSize: 18, 
        padding :5, 
        fontWeight: 'bold'
    },
    progressContainer:  {
        alignItems: 'center'
    },
    progressBarContainer: {
        height: 40, 
        width: 200, 
        borderRadius: 10
    },
    progressBar: {
        height: '100%', 
        borderRadius: 20
    },
    progressBarText: {
        position:'absolute', 
        right: 10, 
        top: 10
    },
    categoryParentContainer: {
        flexWrap: 'wrap', 
        flexDirection:'row', 
        flex: 3
    },
    categoryContainer: {
        width: '29%',
        height: '30%', 
        alignItems: 'center',
        margin: '2%', 
        borderWidth: 2, 
        borderColor: 'grey', 
        borderRadius: 10, 
        backgroundColor: 'white'
    },
    categoryDetailContainer: {
        flex: 1, 
        flexDirection: 'row', 
        paddingHorizontal: 10, 
        alignItems: 'center'
    },
    categorySpendingContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    categorySpendingText: {
        fontSize: 20, 
        fontWeight:'bold'
    },
    categoryCashbackContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    categoryDetailText: {
        fontSize: 10, 
        flex: 1
    },
    categoryCashbackText: {
        fontSize: 12,
        fontWeight:'bold'
    }
})

export {
    SwiperCardView
}

