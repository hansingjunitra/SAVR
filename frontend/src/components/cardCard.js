import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CardCard = (props) => {
    return (
        <View style ={{backgroundColor: props.card.colorCode, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{color: 'white', fontSize: 48}}>{props.card.bank}</Text>
            {/* <Image source = {require('../assets/dbs_black_visa_card.webp')}></Image> */}
        </View>
    )
}

export default CardCard;