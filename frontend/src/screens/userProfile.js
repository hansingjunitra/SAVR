import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {CardContext, CredentialsContext} from '../context';

import {createConnection} from '../saltedge';

const cardDetailsJSON = require('../creditCards.json'); 
export const UserProfile = () => {
    const {getCardList} = React.useContext(CardContext);
    const {getCredentials, deleteCredentials} = React.useContext(CredentialsContext);

    let cardList = getCardList();
    cardList.map((card, index) => {
        let cardDetail = cardDetailsJSON.find(d => d.id == card.id);
        cardList[index] = {...cardDetail, ...card};
        // return (
        //     <View key={index}>
        //         <Text>{card.name}</Text>
        //     </View>
    })

    const credentials = getCredentials();

    const syncOnlineHandler = async (customerID, bankCode) => {
        try {
            const res = await createConnection(customerID, bankCode)
            Linking.openURL(res);
        } catch (err) {
            console.error(err);
        }
    }
    
    cardList.sort(function (a, b) {
        return (a.bank).localeCompare(b.bank);
    })

    return (
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style= {{fontSize: 40}}>Hi {credentials.name}</Text>
            <Text style= {{fontSize: 24}}>Cashback Earned: </Text>
            <Text style= {{fontSize: 24}}>User Owned</Text>
            <View>
                {cardList.map((card, index) => {
                    return (
                        <View key={index} style = {{padding: 10, width: '100%', flexDirection: 'row'}}>
                            <View style ={{flex: 1}}>                            
                                <Text>{card.name}</Text>
                            </View>
                            <TouchableOpacity onPress = {() => card.bank_saltedge_code != null ? syncOnlineHandler(credentials.saltEdgeID, card.bank_saltedge_code): null}>
                                <View>
                                    <Text>Online Sync</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                )})}
            </View>
            <Text style ={{fontSize: 20}}>Token</Text>
            <Text>{JSON.stringify(credentials)}</Text>
            {/* <TouchableOpacity onPress={()=> deleteCredentials()}>
                <Text>
                    Delete Credentials
                </Text>
            </TouchableOpacity> */}
        </View>
    )
}