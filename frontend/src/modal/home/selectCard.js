import React from 'react';
import { View, Text,  TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';

import NewTransactionContext from '../../util/newTransactionContext';

const cardList =  require('../../creditCards.json')
const SelectCard = () => {

    const [selectedCard, setSelectedCard]  = React.useState(null);

    const { setCard, setModal } = React.useContext(NewTransactionContext);

    return (
        <View style = {styles.modalContainer}>
            <View style = {styles.titleContainer}>
                <Text style = {{fontSize: 28}}>Select Card</Text>
                <Text>Which card did you use for spending?</Text>
            </View>
            <View style = {styles.cardScrollContainer}>
                <ScrollView showsVerticalScrollIndicator= {false}>
                    <View style = {{ alignContent: 'stretch',  flex: 1, flexWrap: "wrap",flexDirection: "row"} } onStartShouldSetResponder = {()=>true}>
                        {cardList.map((card, index) => {return (
                            <View key = {index} style = {{width : '50%', padding: 5, height: 100}}>
                                <TouchableOpacity style = {[(selectedCard !== null) && (selectedCard.id === card.id) ? {borderWidth: 3, borderColor: card.color.quartenary, backgroundColor: card.colorCode, borderRadius: 15} : null]} onPress = {() => setSelectedCard(card)}>
                                    <Image style = {{height: '100%', width: '100%', borderRadius: 10}} source = {{uri: card.image}}></Image>
                                </TouchableOpacity>
                            </View>
                        )})}
                    </View>
                </ScrollView>
            </View>
            <View style = {{height: '15%', justifyContent: 'center', width: '40%'}}>
                <TouchableOpacity style = {{margin:10, padding: 10, backgroundColor: '#2196F3', borderRadius: 10, alignItems: 'center'}} onPress = {() => {setCard(selectedCard); setModal(1); console.log('pressed')}}>
                        <Text style = {{color: 'white'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
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
    },
    cardScrollContainer: {
        height: '70%', 
        paddingVertical: 10
    }
})

export default SelectCard;