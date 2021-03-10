import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CreditCardRecordContext } from '../util/context';

const AddCardScreen = ({navigation}) => {

    const allCreditCardList = require('../creditCards.json');
    const [creditCardList, setCreditCardList] = React.useState([]);
    const { addCreditCard, getCreditCardInformation } = React.useContext(CreditCardRecordContext);

    // const allCreditCardList = getCreditCardInformation();

    const addCreditCardHandler = (newCard) => {
        setCreditCardList((prevState) => [
            ...prevState,
            newCard
        ]);
        // TODO: Check if credit card is owned
    }

    const removeCreditCard = (removedCard) => {
        const updatedCreditCardList = creditCardList.filter((card) => card.id !== removedCard.id)
        updatedCreditCardList !== null ? setCreditCardList(updatedCreditCardList) : setCreditCardList([])  
    }

    const setCard = (card) => {
        if (creditCardList.includes(card)){
            removeCreditCard(card);
        } else {
            addCreditCardHandler(card);
        }
    }

    return (
        <View>
            <View style = {{alignItems: 'center'}}>
                <TouchableOpacity style = {styles.button1} onPress = {() => {addCreditCard(creditCardList); navigation.goBack();}}>
                    <View>
                        <Text>Add</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style = {{flexDirection: 'row', flexWrap:'wrap'}}>
                    {allCreditCardList.map((card, index) => {
                        return (
                            <View key = {index} style = {styles.cardContainer}>
                                <TouchableOpacity onPress = {() => setCard(card)}>
                                    <Image source = {{uri: card.image}} 
                                            style = {[styles.cardImage, creditCardList.includes(card) ? {borderWidth: 4, borderColor: card.color.quartenary, borderRadius: 5} : null]}/>
                                    <View style = {styles.cardTextContainer}>
                                        <Text style = {styles.cardText}>{card.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '50%', 
        height: 150, 
        padding: 10,
        borderRadius: 20
    },
    cardText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cardTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    cardImage: {
        width: '100%',
        height: 100,        
    },
    button1: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        margin: 10
    }
})

export default AddCardScreen;