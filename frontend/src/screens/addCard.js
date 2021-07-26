import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardView } from '../components/addCardView';

import { AppContext, CardContext } from '../context/context';

const CARD_DATABASE = require('../creditCards.json');
export const AddCard = ({navigation}) => {

    const [ cardList, setCardList ] = React.useState([]);
    const { state, dispatch } = useContext(AppContext);
    // const { addCard, getCardList, getCardConnectionAccount } = React.useContext(CardContext);

    // const ownedCardList = getCardList();

    const addCardHandler = (newCard) => {
        let cardDetail = {
            ...newCard,
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

    const removeCard = (removedCard) => {
        const updatedcardList = cardList.filter((card) => card.id !== removedCard.id)
        updatedcardList !== null ? setCardList(updatedcardList) : setCardList([])  
    }

    const selectCardHandler = (card) => {
        if (state.cardList.find((ownedCard) => ownedCard.id == card.id)){
            return
        }

        if (cardList.find((owned) => owned.id == card.id)){
            removeCard(card);
        } else {
            addCardHandler(card);
        }
    }

    const addButtonHandler = () => {
        {/* <TouchableOpacity style = {styles.button1} onPress = {() => {getCardConnectionAccountHandler(cardList); addCard(cardList); navigation.goBack();}}> */}
        dispatch({type: "ADD_CARD", data: cardList})
    }

    // const getCardConnectionAccountHandler = (cardList) => {
    //     cardList.map((card) => getCardConnectionAccount(card)); 
    // }

    return (
        <SafeAreaView>
            <View style = {{alignItems: 'center'}}>
                <TouchableOpacity style = {styles.button1} onPress = {addButtonHandler}>
                    <View>
                        <Text>Add</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style = {{flexDirection: 'row', flexWrap:'wrap'}}>
                    {CARD_DATABASE.map((card, index) => {
                        const selected = cardList.includes((s) => s.id == card.id);
                        return <CardView key= {index} card = {card} index = {index} selected = {selected} cardList = {cardList} selectCardHandler = {selectCardHandler}/>
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
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
