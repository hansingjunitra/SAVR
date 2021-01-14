import React from 'react';
import { View, Text } from 'react-native';

const CardCard = (props) => {
    return (
        <View style ={{backgroundColor: props.card.colorCode, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{color: 'white', fontSize: 48}}>{props.card.bank}</Text>
        </View>
    )
}

export default CardCard;