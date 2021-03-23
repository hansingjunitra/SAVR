import React from 'react';

import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigator} from './src/navigation';
import {SHA1} from './src/sha1';

import {SplashScreen} from './src/splashScreen';
import {CredentialsInput} from './src/screens/credentialsInput';
import {CardContext, TransactionContext, CredentialsContext} from './src/context';

const getUniqueId = (username) => {
    // const shasum = crypto.createHash('sha1')
    const date = new Date().getTime().toString();
    const key = username + date;
    // shasum.update(date + username)
    const hash = SHA1(key);
    // const hash = shasum.digest('hex') // => "0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33" 
    return hash;
}

const createSaltEdgeCustomer = async (name, token) => {
    const apiKey = require('./src/apikey.json')
    const url = "https://www.saltedge.com/api/v5/customers"
    const data = {
        data: {
            identifier: name + '-' + token
        }
    }
    try {
        const res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "App-id": apiKey['App-id'],
                "Secret": apiKey['Secret']
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(response => {
            return response.json();
        });
        console.log(res);
        return res['data']['id'];
    } catch (err) {
        console.error(err);
        return Error;
    }
}


const App = () => {
    console.log("Render App.js")

    const [retrieving, setRetrieving] = React.useState(true);
    const [cardList, setCardList] = React.useState([]);
    const [transactionList, setTransactionList] = React.useState([]);
    const [credentials, setCredentials] = React.useState({ token: null, name: null, saltEdgeID: null});

    const CardContextValue = React.useMemo(() => ({
        getCardList: () => {
            return cardList;
        },
        addCard: (card) => {
            console.log('Adding new card');
        },
        deleteCard: (card) => {
            console.log('Remove card');
        },
        updateCardListStorage: () => {
            console.log('Update Card List Storage');
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
        createNewUser: async (name) => {
            const token = getUniqueId(name);
            const saltEdgeID = await createSaltEdgeCustomer(name, token);
            await AsyncStorage.setItem('userCredentials', JSON.stringify({...credentials, name: name, token: token, saltEdgeID: saltEdgeID}));
            setCredentials((prevState) => ({...prevState, name: name, token: token, saltEdgeID: saltEdgeID}));
        },
        deleteCredentials: async () => {
            await AsyncStorage.removeItem('userCredentials');            
            setCredentials({ token: null, name: null, saltEdgeID: null});
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

            setCardList(JSON.parse(fetchedCardList));
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
                {credentials.name == null ?  <CredentialsInput/> : <Navigator/>}
            </CredentialsContext.Provider>
            </TransactionContext.Provider>
            </CardContext.Provider>
        </>
    )
}

export default App;
