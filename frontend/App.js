import React from 'react';

import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigator} from './src/navigation';
import {SHA1} from './src/sha1';

import {SplashScreen} from './src/splashScreen';
import {CredentialsInput} from './src/screens/credentialsInput';
import {CardContext, TransactionContext, CredentialsContext} from './src/context';

import {createSaltEdgeCustomer, getCustomerConnections, getConnectionAccounts, getTransactions} from './src/saltedge';

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
            console.log('Remove card');
            const updatedCardList = cardList.filter((card) => card.id !== removedCard.id)
            AsyncStorage.setItem('creditCardRecord', JSON.stringify([...updatedCardList]));
            setCardList(updatedCardList);
        },
        updateCardListStorage: () => {
            console.log('Update Card List Storage');
        },
        flushCards: () => {
            AsyncStorage.setItem('creditCardRecord', JSON.stringify([]));
            setCardList([]);
        },
        // updateCardConnectionID: () => {
            // let updatedCardList = cardList;
            // for (let i = 0; i < updatedCardList.length; i++){
            //     for (let j = 0; j < credentials.connectionIDList.length; j++){
                    // if (updatedCardList[i]. == updatedCardList[i].card_name) {
                    //     // console.log(Object.keys(updatedCardList[i].saltEdge))
                    //     updatedCardList[i].saltEdge.connectionID = connectionID
                    //     updatedCardList[i].saltEdge.accountID = accountID
                    //     console.log(updatedCardList[i].saltEdge)
                    //     // setCardList(updatedCardList);
                    //     break;
                    // }
                    // console.log
            //     }
            // }
            // console.log(updatedCardList, credentials.connectionIDList)
        // },
        updateCardConnectionID: (accountID, connectionID, cardID) => {
            let updatedCardList = cardList;
            for (let i = 0; i < updatedCardList.length; i++){
                if (updatedCardList[i].id == cardID) {
                    updatedCardList[i].saltEdge.connectionID = connectionID
                    updatedCardList[i].saltEdge.accountID = accountID
                }
            }
            AsyncStorage.setItem('creditCardRecord', JSON.stringify([...updatedCardList]));
            setCardList(updatedCardList);
        },
        getCardConnectionAccount: async (card) => {
            for (let i = 0; i < credentials.connectionIDList.length; i++){
                if (card.bank == credentials.connectionIDList[i].bank) {
                    const connectionID = credentials.connectionIDList[i].id;
                    try {
                        const accounts = await getConnectionAccounts(connectionID);
                        for (let i=0; i<accounts.data.length; i++) {
                            //cardName = "DBS eMulti-Currency Autosave Account";
                            if (accounts.data[i].extra.account_name==card.card_name) {
                                const accountID = accounts.data[i].id;
                                let updatedCardList = cardList;
                                for (let i = 0; i < updatedCardList.length; i++){
                                    if (updatedCardList[i].id == card.id) {
                                        updatedCardList[i].saltEdge.connectionID = connectionID;
                                        updatedCardList[i].saltEdge.accountID = accountID;
                                        updatedCardList[i].saltEdge.iBankingSync = true;
                                    }
                                }
                                AsyncStorage.setItem('creditCardRecord', JSON.stringify([...updatedCardList]));
                                setCardList(updatedCardList);
                            }
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
        }
    }));

    const TransactionContextValue = React.useMemo(() => ({
        getTransactionList: () => {
            return transactionList;
        },
        addTransaction: (transaction) => {
            console.log("Add transaction");
        },
        fetchTransactions: async (connectionID, accountID, card) => {
            const transactions = await getTransactions(connectionID, accountID);
            let parsedTransactions = []
            let lastTransactionID = card.saltEdge.lastTransactionIDFetched
            for (let i = 0; i < transactions.length; i++) {

                console.log(lastTransactionID, transactions[i].id,  lastTransactionID < transactions[i].id)
                if (lastTransactionID < transactions[i].id) {
                    lastTransactionID = transactions[i].id
                    parsedTransactions.push(
                        {
                            id: transactions[i].id,
                            cardID: card.id,
                            amount: transactions[i].amount,
                            category: transactions[i].category,
                            description: transactions[i].description,
                            date:   transactions[i].made_on,
                            merchant: transactions[i].extra.merchant_id
                        }
                    )
                }
            }
                    
            let updatedTransactionList = [...transactionList, ...parsedTransactions]
            let updatedCardList = cardList;
            for (let i = 0; i < updatedCardList.length; i++){
                if (card.id == updatedCardList[i].id) {
                    updatedCardList[i].saltEdge.lastTransactionIDFetched = lastTransactionID;
                    break
                }
            }
            setTransactionList(updatedTransactionList);
            AsyncStorage.setItem('transactionHistory', JSON.stringify([...updatedTransactionList]));
            setCardList(updatedCardList);
            AsyncStorage.setItem('creditCardRecord', JSON.stringify([...updatedCardList]));

        },
        deleteTransaction: (transaction) => {
            console.log("Remove transaction");
        },
        updateTransaction: (updatedTransaction) => {
            const index = transactionList.findIndex((transaction) => transaction.id == updatedTransaction.id);
            transactionList[index] = updatedTransaction;

            setTransactionList(transactionList);

        },
        updateTransationListStorage: () => {
            console.log('Update Transaction List Storage');
        },
        flushTransactions: () => {
            setTransactionList([]);
            AsyncStorage.setItem('transactionHistory', JSON.stringify([]));
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
            setCredentials((prevState) => ({...prevState, connectionIDList: connectionIDList}))
        },
        getAccounts: async (connectionID) => {
            // console.log(credentials);
            const accountList = await getConnectionAccounts(connectionID);
            console.log(accountList, connectionID);
        },
        // hard set credentials for development purpose
        setCredentials: async () => {
            await AsyncStorage.setItem('userCredentials', JSON.stringify({...credentials, username: "Bobby", token: "491f970e1c69c8b7fced01e89c810d93eabc9f3d", saltEdgeID: "424595968315361542", secret: "BTFCggxUJDBoPtMvjmKN-zcNWGY7xZUmIsdQps30eak"}));
            setCredentials((prevState) => ({...prevState, username: "Bobby", token: "491f970e1c69c8b7fced01e89c810d93eabc9f3d", saltEdgeID: "424595968315361542", secret: "BTFCggxUJDBoPtMvjmKN-zcNWGY7xZUmIsdQps30eak"}));
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
            if (fetchedTransactionList !== null) {
                setTransactionList(JSON.parse(fetchedTransactionList));
            }
        }
        getFromStorage();
        setTimeout(() => setRetrieving(false), 500);

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
