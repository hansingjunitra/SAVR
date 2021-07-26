import React from 'react';
import { View, Text, Image, StyleSheet  } from 'react-native';
import { Icon } from 'react-native-elements';
import { ProgressBar, Colors } from 'react-native-paper';
import { rebateFuncMap } from '../util/rebateCalculation';

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


const SwiperCardView = (props) => {
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
                        <Text style = {style.progressBarText}>${card.totalSpent} / ${card.minimum_spending}</Text>
                    </View>
                </View>
                <Text style = {{fontSize: 12, marginTop :5, fontWeight: 'bold'}}>Current Total Rebate: ${realisedRebates.toFixed(2)} / ${card.maximum_rebates}</Text>
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
                                <Text style = {style.categorySpendingText}>${card.spendingBreakdown[category.eligibility]}</Text>
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