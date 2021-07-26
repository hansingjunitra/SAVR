import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const style = StyleSheet.create({
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
        resizeMode: 'contain'       
    },
})

const borderCardStyle = (borderColor) => StyleSheet.create({
    selectedCard:  {
        borderWidth: 4, 
        borderColor: borderColor,
        borderRadius: 5
    } 
})

const CardView = (props) => {
    const { card, selectCardHandler, cardList } = props;
    return (
        <View style = {style.cardContainer}>
            <TouchableOpacity onPress = {() => selectCardHandler(card)}>
                <Image source = {{uri: card.image}} 
                        style = {[style.cardImage, 
                            cardList.find((owned) => owned.id == card.id) != undefined ? borderCardStyle(card.color.quartenary).selectedCard : null
                            ]}/>
                <View style = {style.cardTextContainer}>
                    <Text style = {style.cardText}>{card.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export {
    CardView
}