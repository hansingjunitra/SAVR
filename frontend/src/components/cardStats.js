import React from 'react';
import { View, Text } from 'react-native';

import CardCard from '../components/cardCard';

const CardStats = (props) => {

    // const cardList = [{bank: 'DBS', colorCode: '#000000', asset: props.cardInfo.card}]

    return (
        <View style={{flex: 1, flexDirection: 'row',
                    height: 100}}>
            {/* <View style={{flex: 1, transform: [{scale: 0.6}]}}>
                {props.card.map((card, index) => {
                    return <CardCard key = {index} card = {card}/>
                })}
            </View> */}
            <View style={{flex: 1, padding: 20}}>
                <Text>
                    Minimum spend: {!props.card.limit ? 'No': '$' + props.card.limit}{'\n'}
                    Rebate categories: {props.card.cashbacks.eligibility}
                </Text>
            </View>
        </View>
    )

}

export default CardStats;


//{cardList.map((card, index) => {
    //return <CardCard key = {index} card = {card}/>
//})}
