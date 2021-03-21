import React from 'react';

import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreditCardRecordContext, TransactionRecordContext} from './src/util/context';
import {Navigator} from './src/navigation';
import {CardContext, TransactionContext} from './src/context';

import {SplashScreen} from './src/splashScreen';

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
    
    React.useEffect(() => {
        console.log('Fetching Data From Internal Storage');
        const getFromStorage = async () => {
            let fetchedCardList, fetchedTransactionList, fetchedCredentials = null;
            try {
                fetchedCardList = await AsyncStorage.getItem('creditCardRecord');
                fetchedTransactionList = await AsyncStorage.getItem('transactionHistory');

                fetchedCredentials = await AsyncStorage.getItem('userCredentials');
                if (fetchedCredentials == null) {
                    // AsyncStorage.setItem()
                    // Get customer_id for SaltEdge
                }

            } catch (err) {
                console.error(err);
            }
            setCardList(JSON.parse(fetchedCardList));
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
                <Navigator/>
            </TransactionContext.Provider>
            </CardContext.Provider>
        </>
    )
}

export default App;
