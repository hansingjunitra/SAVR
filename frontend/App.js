import React from 'react';

import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigator} from './src/navigation';
import {SHA1} from './src/sha1';

import {SplashScreen} from './src/splashScreen';
import {CredentialsInput} from './src/screens/credentialsInput';
import {CardContext, TransactionContext, CredentialsContext} from './src/context';

import {createSaltEdgeCustomer, getCustomerConnections, getConnectionAccounts} from './src/saltedge';

const getUniqueId = (username) => {
    const date = new Date().getTime().toString();
    const key = username + date;
    const hash = SHA1(key);
    return hash;
}

const App = () => {
    console.log("Render App.js")

    const [retrieving, setRetrieving] = React.useState(true);
    const [cardList, setCardList] = React.useState([]);
    const [transactionList, setTransactionList] = React.useState([]);
    const [credentials, setCredentials] = React.useState({ token: null, secret:null, username: null, saltEdgeID: null, connectionIDList: []});
    /*
        {
            id: ____ ,
            accountList : [
                {
                    id: ____ ,
                    account_name: ____

                }
            ]
        }
    */
    const [saltEdgeAccount, setSaltEdgeAccount] = React.useState({id: null, connectionList: []})

    const CardContextValue = React.useMemo(() => ({
        getCardList: () => {
            // console.log(cardList);
            return cardList;
        },
        addCard: (newCardList) => {
            console.log('Adding new card');
            AsyncStorage.setItem('creditCardRecord', JSON.stringify([...cardList, ...newCardList]));
            setCardList((prevState) => [...prevState, ...newCardList]);
        },
        deleteCard: (removedCard) => {
            const updatedList = cardList.filter((card) => card.id !== removedCard.id)
            AsyncStorage.setItem('creditCardRecord', JSON.stringify([...updatedList]));
            setCardList(updatedList);
            console.log('Remove card');
        },
        updateCardListStorage: () => {
            console.log('Update Card List Storage');
        },
        flushCards: () => {
            AsyncStorage.setItem('creditCardRecord', JSON.stringify([]));
            setCardList([]);
        },
        updateCardConnectionID: () => {
            // let updatedCardList = cardList;
            // for (let i = 0; i < updatedCardList.length; i++){
            //     console.log(updatedCardList[i].bank)
            //     console.log(credentials.connectionIDList)
            //     const connection = credentials.connectionIDList.find(connection => updatedCardList[i].bank == connection.bank);
            //     // updatedCardList[i][saltEdge][connectionId] = connection.id;
            //     console.log('connection' , connection)
            // }
            // console.log(updatedCardList);
            // setCardList(updatedCardList);
        }
    }));

    const TransactionContextValue = React.useMemo(() => ({
        getTransactionList: () => {
            return transactionList;
        },
        addTransaction: (transaction) => {
            console.log("Add transaction");
        },
        deleteTransaction: (transaction) => {
            console.log("Remove transaction");
        },
        updateTransationListStorage: () => {
            console.log('Update Transaction List Storage');
        }
    }))

    const CredentialsContextValue = React.useMemo(() => ({
        getCredentials: () => {
            return credentials;
        },
        createNewUser: async (username) => {
            const token = getUniqueId(username);
            const [saltEdgeID, secret] = await createSaltEdgeCustomer(username, token);
            await AsyncStorage.setItem('userCredentials', JSON.stringify({...credentials, username: username, token: token, saltEdgeID: saltEdgeID, secret: secret}));
            setCredentials((prevState) => ({...prevState, username: username, token: token, saltEdgeID: saltEdgeID, secret: secret}));
        },
        deleteCredentials: async () => {
            await AsyncStorage.removeItem('userCredentials');            
            setCredentials({ token: null, username: null, secret:null, saltEdgeID: null, connectionIDList: []});
        },
        getConnections: async () => {
            const customerID = credentials.saltEdgeID;
            const connectionList = await getCustomerConnections(customerID);
            let connectionIDList = [];
            
            for (let i = 0; i < connectionList.length; i++) {
                const connection = connectionList[i];
                connectionIDList.push({id: connection.id , bank: connection.provider_name});
            }
            // console.log(connectionIDList)
            setCredentials((prevState) => ({...prevState, connectionIDList: connectionIDList}))
        },
        getAccounts: async (connectionID) => {
            // console.log(credentials);
            const accountList = await getConnectionAccounts(connectionID);
            console.log(accountList);
        }
    }))
    
    React.useEffect(() => {
        console.log('Fetching Data From Internal Storage');
        const getFromStorage = async () => {
            let fetchedCardList, fetchedTransactionList, fetchedCredentials = null;
            try {
                fetchedCardList = await AsyncStorage.getItem('creditCardRecord');
                fetchedTransactionList = await AsyncStorage.getItem('transactionHistory');
                fetchedCredentials = await AsyncStorage.getItem('userCredentials');
            } catch (err) {
                console.error(err);
            }

            if (fetchedCardList !== null) {
                setCardList(JSON.parse(fetchedCardList));
            }
            if (fetchedCredentials !== null) {
                setCredentials(JSON.parse(fetchedCredentials));
            }
        }
        getFromStorage();
        setTimeout(() => setRetrieving(false), 2000);

        return () => {
            console.log('Closing Application')
        }
    }, [])

    if (retrieving) {
        return (
            <SplashScreen/>
        )
    }

    return (
        <>
            <CardContext.Provider value = {CardContextValue}>
            <TransactionContext.Provider value = {TransactionContextValue}>
            <CredentialsContext.Provider value = {CredentialsContextValue}>
                {credentials.username == null ?  <CredentialsInput/> : <Navigator/>}
            </CredentialsContext.Provider>
            </TransactionContext.Provider>
            </CardContext.Provider>
        </>
    )
}

export default App;
