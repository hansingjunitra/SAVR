import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CardContext } from '../context';

const allcardList = require('../creditCards.json');
export const AddCard = ({navigation}) => {

    const [cardList, setCardList] = React.useState([]);
    const { addCard, getCardList, getCardConnectionAccount } = React.useContext(CardContext);

    const ownedCardList = getCardList();

    const addCardHandler = (newCard) => {
        let cardDetail = {
            id: newCard.id,
            totalSpent: 0,
            spendingBreakdown: {},
            iBankingSync: false,
            saltEdge: {
                connectionID: null,
                accountID: null,
                lastTransactionIDFetched: null
            }
        };

        newCard.categories.map((category, index) => {
            cardDetail.spendingBreakdown[category.eligibility] = 0
        })

        setCardList((prevState) => [
            ...prevState,
            cardDetail
        ]);
        // TODO: Check if credit card is owned
    }

    const removecard = (removedCard) => {
        const updatedcardList = cardList.filter((card) => card.id !== removedCard.id)
        updatedcardList !== null ? setCardList(updatedcardList) : setCardList([])  
    }

    const selectCardHandler = (card) => {
        if (ownedCardList.find((owned) => owned.id == card.id)){
            console.log('Card is owned');
            return
        }

        if (cardList.find((owned) => owned.id == card.id)){
            removecard(card);
        } else {
            addCardHandler(card);
        }
    }

    const getCardConnectionAccountHandler = (cardList) => {
        cardList.map((card) => getCardConnectionAccount(card)); 
    }

    return (
        <View>
            <View style = {{alignItems: 'center'}}>
                <TouchableOpacity style = {styles.button1} onPress = {() => {getCardConnectionAccountHandler(cardList); addCard(cardList); navigation.goBack();}}>
                    <View>
                        <Text>Add</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style = {{flexDirection: 'row', flexWrap:'wrap'}}>
                    {allcardList.map((card, index) => {
                        return (
                            <View key = {index} style = {styles.cardContainer}>
                                <TouchableOpacity onPress = {() => selectCardHandler(card)}>
                                    <Image source = {{uri: card.image}} 
                                            style = {[styles.cardImage, cardList.find((owned) => owned.id == card.id) != undefined ? {borderWidth: 4, borderColor: card.color.quartenary, borderRadius: 5} : null]}/>
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
