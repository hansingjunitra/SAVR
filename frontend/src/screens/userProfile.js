import React, { useContext } from 'react';
import {View, Text, TouchableOpacity, Linking, ScrollView, SafeAreaView} from 'react-native';
import {AppContext, CardContext, CredentialsContext, TransactionContext} from '../context/context';

import {createConnection, getConnectionAccounts, getCustomerConnections, getTransactions} from '../saltedge';
import { AddCard } from './addCard';
import { savrAlgo } from '../util/algo';
import { Button } from 'react-native';

const cardDetailsJSON = require('../creditCards.json');

const syncBankHandler = async (customerID, bankCode) => {
    try {
        const res = await createConnection(customerID, bankCode)
        Linking.openURL(res);
    } catch (err) {
        console.error(err);
    }
}

const syncAccountHandler = async (connectionID, cardName, updateCardConnectionID) => {
    // console.log(connectionID, cardName)
    // try {
    //     const accounts = await getConnectionAccounts(connectionID);
    //     var found = 0;
    //     try {
    //         const acc = accounts.data;
    //         var i;
    //         for (i=0; i<acc.length; i++) {
    //             if (acc[i].extra.account_name==cardName) {
    //                 found = 1;
    //                 const accountID = acc[i].id;                 
    //                 updateCardConnectionID(accountID, connectionID, cardName)
    //             }
    //         }
    //         if (found==0) {
    //             alert('Card not found');
    //         }
    //     }
    //     catch {
    //         console.error("connectionID not found");
    //         console.log(accounts.data[0].id);
    //     }
    // } catch (err) {
    //     console.error(err);
    // }
}

const SyncButton = (props) => {
    const {credentials, card} = props.props
    const connections = credentials.connectionIDList.find((connection) => connection.bank == card.bank)

    const {updateCardConnectionID} = React.useContext(CardContext);

    return (
        <View>
            <TouchableOpacity onPress = {() => card.bank_saltedge_code != null ? syncBankHandler(credentials.saltEdgeID, card.bank_saltedge_code): null}>
                <View>
                    <Text>Sync bank</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => connections != undefined ? syncAccountHandler(connections.id, card.card_name, updateCardConnectionID): alert("Sync bank first")}>
            <View>
                <Text>Sync card</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const SyncStatus = (props) => {
    const {credentials, card} = props.props
    const synced = credentials.connectionIDList.find((connection) => connection.bank == card.bank)
    if (synced != undefined) {
        return (
            <View>
                <Text>Status: Synced</Text>
            </View>
        )            
    } else {
        return (
            <View>
                <Text>Status: Not Synced</Text>
            </View>
        )
    }
}

export const UserProfile = ({navigation}) => {
    console.log("Render User Profile");

    // const {getCardList, flushCards, deleteCard, updateCardConnectionID} = React.useContext(CardContext);
    // const {getCredentials, getConnections, getAccounts, setCredentials} = React.useContext(CredentialsContext);

    const { state, dispatch } = useContext(AppContext);

    // React.useEffect(() => {
        // console.log('Render userProfile.js UseEffect');
        // getConnections();
    // }, [])
    
    // let cardList = getCardList();
    // cardList.map((card, index) => {
    //     let cardDetail = cardDetailsJSON.find(d => d.id == card.id);
    //     cardList[index] = {...cardDetail, ...card};
    // })

    // const credentials = getCredentials();

    // cardList.sort(function (a, b) {
    //     return (a.bank).localeCompare(b.bank);
    // })

    const deleteHandler = async () => {
        try {
            await AsyncStorage.removeItem("APP_STATE");
            return true;
        }
        catch(exception) {
            return false;
        }
    }


    return (
        <ScrollView>
        <SafeAreaView style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style= {{fontSize: 40}}>Hi {state.username}</Text>
            <Text style= {{fontSize: 24}}>Cashback Earned: </Text>
            <Text style= {{fontSize: 24}}>User Owned</Text>
            <Button onPress = {deleteHandler} title =  "button"> </Button>
            {/* <View>
                {cardList.map((card, index) => {
                    return (
                        <View key={index} style = {{padding: 10, width: '100%', flexDirection: 'row'}}>
                            <View style ={{flex: 1}}>
                                <Text>{card.card_name}</Text>
                            </View>
                            <View style ={{flex: 1}}>
                                <SyncButton props = {{credentials: credentials, card: card}}/>
                                <SyncStatus props = {{credentials: credentials, card: card}}/>
                            </View>
                            <View style ={{flex: 1}}>
                            <TouchableOpacity onPress = {() => deleteCard(card)}>
                                <View>
                                    <Text>Delete</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                        </View>
                )})}
            </View> */}
            <Text style ={{fontSize: 20}}>{JSON.stringify(state.token)}</Text>
            {/* <Text>{JSON.stringify(credentials)}</Text> */}
            {/* <TouchableOpacity onPress={()=> deleteCredentials()}>
                <Text>
                    Delete Credentials
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=> navigation.navigate("AddCard")} style ={{margin: 10}}>
                <Text>
                    Add Cards
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=> flushCards()} style ={{margin: 10}}>
                <Text>
                    Delete Cards
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setCredentials()} style ={{margin: 10}}>
                <Text>
                    Edit Credentials
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> updateCardConnectionID()} style ={{margin: 10}}>
                <Text>
                    Update Card Connection
                </Text>
            </TouchableOpacity>
             */}
            </SafeAreaView>
        </ScrollView>
    )
}