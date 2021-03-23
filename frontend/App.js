import React from 'react';

import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigator} from './src/navigation';
import {SHA1} from './src/sha1';

import {SplashScreen} from './src/splashScreen';
import {TokenInput} from './src/screens/TokenInput';
import {CardContext, TransactionContext, TokenContext} from './src/context';

const getUniqueId = (username) => {
    // const shasum = crypto.createHash('sha1')
    const date = new Date().getTime().toString();
    const key = username + date;
    // shasum.update(date + username)
    const hash = SHA1(key);
    // const hash = shasum.digest('hex') // => "0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33" 
    return hash;
    
}

const App = () => {
    console.log("Render App.js")

    const [retrieving, setRetrieving] = React.useState(true);
    const [cardList, setCardList] = React.useState([]);
    const [transactionList, setTransactionList] = React.useState([]);
    const [token, setToken] = React.useState({ id: null, name: null});

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

    const TokenContextValue = React.useMemo(() => ({
        getToken: () => {
            return token;
        },
        setTokenName: (name) => {
            setToken({...prevState, 'name': name, 'id': getUniqueId(name)});
            // create new customer on saltedge 
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
                setCredentials(fetchedCredentials);
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

    // console.log(token.id, token.name)

    return (
        <>
            <CardContext.Provider value = {CardContextValue}>
            <TransactionContext.Provider value = {TransactionContextValue}>
            <TokenContext.Provider value = {TokenContextValue}>
                {/* {token.name === null ?  <TokenInput/> : <Navigator/>} */}
                <Navigator/>
            </TokenContext.Provider>
            </TransactionContext.Provider>
            </CardContext.Provider>
        </>
    )
}

export default App;
