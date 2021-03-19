import React from 'react';

import { View, Image, Dimensions, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreditCardRecordContext, TransactionRecordContext} from './src/util/context';

import {CardContext, TransactionContext} from './src/context';

import {SplashScreen} from './src/splashScreen';
import {TestScreen} from './src/screens/testScreen';

const App = () => {
    console.log("Render App.js")

    const [retrieving, setRetrieving] = React.useState(true);
    const [cardList, setCardList] = React.useState([]);
    const [transactionList, setTransactionList] = React.useState([]);

    const CardContextValue = React.useMemo(() => ({
        getCardList: () => {
            return cardList;
        },
        addCard: (card) => {
            console.log('Adding new card');
        },
        deleteCard: (card) => {
            console.log('Remove card');
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
        }
    }))
    
    React.useEffect(() => {
        console.log('Fetching Data From Internal Storage');
        const getFromStorage = async () => {
            let fetchedCardList = null;
            try {
                fetchedCardList = await AsyncStorage.getItem('creditCardRecord');
            } catch (err) {
                console.error(err);
            }
            setCardList(fetchedCardList);
        }
        getFromStorage();
        setTimeout(() => setRetrieving(false), 2000);
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
                <TestScreen/>
            </TransactionContext.Provider>
            </CardContext.Provider>
        </>
    )
}

export default App;
