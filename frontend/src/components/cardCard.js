import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CardCard = (props) => {

    const getAsset= asset => {
        switch(asset){
            case 'dbs_live_fresh_card':
                return (require('../assets/dbs_live_fresh_card.jpeg'))
            case 'uob_visa':
                return (require('../assets/uob_visa.jpeg'))
            case 'ocbc_365':
                return (require('../assets/ocbc_365.jpeg'))
        }
    }

    return (
        <View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {/* <Text style = {{color: 'white', fontSize: 48}}>{props.card.bank}</Text> */}
            <Image source = {getAsset(props.card.asset)} style={{height: 150, width: 250, borderRadius: 15}}></Image>
        </View>
    )
}

export default CardCard;