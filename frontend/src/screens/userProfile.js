import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CardContext} from '../context';

const cardDetailsJSON = require('../creditCards.json'); 
export const UserProfile = () => {
    const {getCardList} = React.useContext(CardContext);
    let cardList = getCardList();

    cardList.map((card, index) => {
        let cardDetail = cardDetailsJSON.find(d => d.id == card.id);
        cardList[index] = {...cardDetail, ...card};
        // return (
        //     <View key={index}>
        //         <Text>{card.name}</Text>
        //     </View>
    })
    
    cardList.sort(function (a, b) {
        return (a.bank).localeCompare(b.bank);
    })

    return (
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style= {{fontSize: 40}}>Hi User</Text>
            <Text style= {{fontSize: 24}}>Cashback Earned: </Text>
            <Text style= {{fontSize: 24}}>User Owned</Text>
            <View>
                {cardList.map((card, index) => {
                    return (
                        <View key={index} style = {{padding: 10, width: '100%', flexDirection: 'row'}}>
                            <View style ={{flex: 1}}>                            
                                <Text>{card.name}</Text>
                            </View>
                            <TouchableOpacity>
                                <View>
                                    <Text>Online Sync</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                )})}
            </View>
        </View>
    )
}