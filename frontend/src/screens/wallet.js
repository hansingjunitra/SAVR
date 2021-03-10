import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { ProgressBar, Colors } from 'react-native-paper';
import { CreditCardRecordContext, TransactionRecordContext } from '../util/context';

import Swiper from 'react-native-swiper';
import { ScrollView } from 'react-native-gesture-handler';

const Wallet = ({navigation}) => {
    const { getCreditCardList } = React.useContext(CreditCardRecordContext);
    const { getTransactionList } = React.useContext(TransactionRecordContext);
    const randomPick = () => {
        return Math.floor(Math.random() * 3)
    }

    const randomAdd = () => {
        return Math.floor(Math.random() * 10) * Math.floor(Math.random() * 10)
    }

    const creditCardList = getCreditCardList();

    const getCashback = (cashback) => {
        let value = cashback.percentage * cashback.spent
        if (cashback.cap !== null ) {
            if (value >= cashback.cap) {
                let num = 23
                console.log(num.toFixed(2))
                return (cashback.cap).toFixed(2)
            }
        } else {
            return value.toFixed(2)
        }
    }

    const getProgress = (spent, minimum) => {
        let value = spent / minimum;
        if (value > 1) {
            return 1;
        } else {
            return value;
        }
    }
    
    return (
        <View style = {{flex:1}}>
            <View style = {{flex: 1, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                <TouchableOpacity onPress = {() => navigation.navigate('AddCardScreen')}>
                    <View style = {styles.button1}>
                        <Text>Add Credit Card</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress = {() => 
                    updateCards((prevState) => ({
                        ...prevState,
                        totalSpent : prevState.totalSpent + randomAdd() 
                    }))}>
                <View style = {{height: 100, width: 100, backgroundColor: 'black'}}>
                        <Text>Add</Text>
                </View>
            </TouchableOpacity> */}
            <View style = {{flex: 6, paddingTop: 25}}>
                <Swiper autoplayTimeout = {10} autoplay = {true} showsPagination= {true}>
                    {creditCardList.map((card, index) => {
                        return (
                            <View key = {index} style = {{flex: 1}}>
                                <ScrollView>
                                    <View style = {{alignItems: 'center'}}>
                                        <Image source = {{uri: card.image}} style = {{height: 120, width: 200, borderRadius: 10}}/>
                                        <Text style = {{fontSize: 18, padding :5, fontWeight: 'bold'}}>{card.name}</Text>
                                    </View>
                                    <View style = {{alignItems: 'center'}}>
                                        <View style ={{height: 40, width: 200, borderRadius: 10}}>
                                            <ProgressBar progress={getProgress(card.totalSpent, card.minimum_spending)} color={card.color.quartenary} style = {{height: '100%', borderRadius: 20}}/>
                                            <Text style = {{position:'absolute', right: 10, top: 10}}>${card.totalSpent} / ${card.minimum_spending}</Text>
                                        </View>
                                    </View>
                                    <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
                                        {card.cashbacks.map((cashback, index) => {return (
                                            <View style ={{width: '33%', height: 100, justifyContent: 'center', alignItems: 'center'}} key = {index}>
                                                <Text style = {{fontSize: 20}}>$ {cashback.spent}</Text>
                                                <Text style = {{textAlign: 'center', fontSize: 10}}>{cashback.eligibility}</Text>
                                                <Text style = {{fontSize: 8}}>Cashback: {getCashback(cashback)}</Text>
                                            </View>
                                        )})}
                                    </View>
                                </ScrollView>
                            </View>
                        )
                    })}
                </Swiper>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button1: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        margin: 10
    }
})

export default Wallet;
