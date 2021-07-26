import React from 'react';
import { View, 
        TouchableOpacity,
        StyleSheet, 
        Image } from 'react-native';

const SelectCardWalletView = (props) => {
    const { card, selectCardHandler, index } = props
    return (
        <View style = {style.cardContainer}>
            <TouchableOpacity onPress = {() => selectCardHandler(index)}>
                <Image style = {style.cardImage} source = {{uri: card.image}}></Image>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    cardContainer: {
        width : '50%', 
        padding: 5, 
        height: 100
    },
    cardImage: {
        height: '100%', 
        width: '100%', 
        borderRadius: 10
    }
})

export {
    SelectCardWalletView
}