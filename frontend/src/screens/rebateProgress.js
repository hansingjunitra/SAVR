import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {CardContext} from '../context';
import { ProgressBar, Colors } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';

const cardDetailsJSON = require('../creditCards.json'); 

export const RebateProgress = () => {
    console.log('Render RebateProgress.js');
    const {getCardList, addCard, deleteCard} = React.useContext(CardContext);
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

    const getTotalSpent = (breakdown) => {
        let total = 0
        // Object.keys(breakdown).forEach(function(key) {
        //     total +=
        //     console.log(key, obj[key]);
          
        //   });

        return total
    }

    return (
        <ScrollView>
            <View style = {{flex: 1, alignItems: 'center', backgroundColor:'white'}}>
                <View style = {{flex: 1}}>
                    <Swiper autoplayTimeout = {10} autoplay = {true} showsPagination= {false}>
                        {cardList.map((card, index) => {
                            {/* console.log(card.breakdown); */}
                            let cardDetail = cardDetailsJSON.find(d => d.id == card.id);
                            card = {...cardDetail, ...card};
                            return (
                                <View style = {{flex: 1, justifyContent: 'center'}} key ={index}>
                                    <View style = {{alignItems: 'center', flex: 2, justifyContent: 'center'}}> 
                                        <Image source = {{uri: cardDetail.image}} style = {{height: 120, width: 200, borderRadius: 10}}/>
                                        <Text style = {{fontSize: 18, padding :5, fontWeight: 'bold'}}>{cardDetail.name}</Text>
                                        <View style = {{alignItems: 'center'}}>
                                            <View style ={{height: 40, width: 200, borderRadius: 10}}>
                                                <ProgressBar progress={getProgress(card.totalSpent, card.minimum_spending)} color={card.color.quartenary} style = {{height: '100%', borderRadius: 20}}/>
                                                <Text style = {{position:'absolute', right: 10, top: 10}}>${card.totalSpent} / ${card.minimum_spending}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style = {{height: 50}}>
                                        <TouchableOpacity>
                                            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                                <Text style = {{fontSize: 20}}>Sync</Text>
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
                                                        <Text style = {{fontSize: 24, fontWeight:'bold'}}>${card.breakdown[category.eligibility]}</Text>
                                                    </View>
                                                    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                        <Text style = {{fontSize: 12, fontWeight:'bold'}}>Cashback: ${getCashback(category.percentage, card.breakdown[category.eligibility], category.cap)}</Text>
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
            </View> 
        </ScrollView>
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
        backgroundColor:'#73AEBB',
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