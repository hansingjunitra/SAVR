import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardView } from '../components/addCardView';

import { AppContext, CardContext } from '../context/context';
import { getCardConnectionAccount } from '../context/method/card';

const CARD_DATABASE = require('../creditCards.json');
export const AddCard = ({navigation}) => {

    const { state, dispatch } = useContext(AppContext);
    const [ newCardList, setNewCardList ] = React.useState([]);
    const selectCardHandler = (card) => {
        if (newCardList.includes(card)){
            setNewCardList(newCardList.filter((c) => c.id !== card.id))
        } else {
            setNewCardList([ ...newCardList, card])
        }
    }

    const addButtonHandler = async () => {
        const addCardDetail = async (card, index) => {
            let spendingBreakdown = {}
            card.categories.map(category => {
                spendingBreakdown[category.eligibility] = 0
            })
            const saltEdgeCardDetails = await getCardConnectionAccount(state.connectionIDList, card)
            const res = {
                ...newCardList[index],
                totalSpent: 0,
                spendingBreakdown: spendingBreakdown,
                saltEdge : saltEdgeCardDetails
            }
            return res
        }
        let promises = newCardList.map( async (card, index) => await addCardDetail(card, index))
        Promise.all(promises).then(addCardDetailList => {
            dispatch({type: "ADD_CARD", data: addCardDetailList})
        }).catch(e => {
          console.error(e);
        })
        setNewCardList([]);
        navigation.goBack();
    }


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
                    {CARD_DATABASE.filter(c => state.cardList.filter(d => d.id == c.id)).map((card, index) => {
                        return <CardView key= {index} card = {card} index = {index} newCardList = {newCardList} selectCardHandler = {selectCardHandler}/>
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
