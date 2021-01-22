import React from 'react';
import { View, Text } from 'react-native';

import CardCard from '../components/cardCard';

const CardStats = (props) => {

    const cardList = [{bank: 'DBS', colorCode: '#000000', asset: props.cardInfo.card}]

    return (
        <View style={{flexdirection: 'row',
                    height: 200,
                    padding: 20}}>
            <View style={{flex: 1}}>
                {cardList.map((card, index) => {
                    return <CardCard key = {index} card = {card}/>
                })}
            </View>
            <View style={{flex: 1, padding: 20}}>
                <Text>
                    Limit: {props.cardInfo.limit}{'\n'}
                    Cashback earned: ${props.cardInfo.cashback}{'\n'}
                    Categories: {props.cardInfo.categories}
                </Text>
            </View>
        </View>
    )

}

export default CardStats;