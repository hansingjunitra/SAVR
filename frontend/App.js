import React from 'react';

import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeTab from './src/navigations/homeNavigation';
import ProfileTab from './src/navigations/profileNavigation';
import CardTab from './src/navigations/cardNavigation';
import WalletTab from  './src/navigations/walletNavigation';

import {CreditCardRecordContext, TransactionRecordContext} from './src/util/context';
import { set } from 'react-native-reanimated';

const BottomTab = createBottomTabNavigator();

const App = () => {

    const [transactionList, setTransactionList] = React.useState([]);
    const [creditCardList, setCreditCardList] = React.useState([]);

    const [updateTransactionList, setUpdateTransactionList] = React.useState(false);
    const [updateCreditCardList, setUpdateCreditCardList] = React.useState(false);
    
    const [retrieved, setRetrieved] = React.useState(false);
    React.useEffect(() => {
        // When first load - get transactionList and user cards from internal storage
        const getTransactionHistory = async() => {
            console.log('First Retrieve')
            try {
                const transcationRecord = JSON.parse( await AsyncStorage.getItem('transactionHistory'));
                transcationRecord === null ? setTransactionList([]) : setTransactionList(transcationRecord);
                const creditCardRecord = JSON.parse( await AsyncStorage.getItem('creditCardRecord'));
                creditCardRecord === null ? setCreditCardList([]) : setCreditCardList(creditCardRecord);
            } catch (e) {
                console.error(e);
            }
        }

        if (!retrieved) {
            getTransactionHistory().then('Initial Transaction List');
            setRetrieved(true);
        } 
    }, [retrieved]);

    
    // Update the internal storage when creditCardList changes except when first load
    React.useEffect(() => {
        const updateLocalStorage = async() => {
            try {
                await AsyncStorage.setItem('creditCardRecord', JSON.stringify(creditCardList));
            } catch (e) {
                console.log(e);
            }
        }
        if (updateCreditCardList) {
            updateLocalStorage();
            setUpdateCreditCardList(false);
            console.log('Updated CreditCard Internal Storage')
        } else {
            console.log('CreditCard Internal Storage not updated')
        }
    }, [creditCardList])
    
    // Update transactionList state then update transactionList in internal storage
    const addNewTransactionHandler = (newTransaction) => {
        setUpdateTransactionList(true);
        setTransactionList((prevState) => [
            newTransaction,
            ...prevState
        ]);
    }
    
    // Delete transaction from transactionList then update transactionList in internal storage
    const deleteTransactionHandler = (deletedTransaction) => {
        setUpdateTransactionList(true);
        const updatedTransactionList = transactionList.filter(transaction => transaction.id !== deletedTransaction.id);
        setTransactionList(updatedTransactionList);
    }
    
    // Update the internal storage when transasctionList changes except when first load
    const addNewCreditCardHandler = (creditCards) => {
        setUpdateCreditCardList(true);
        setCreditCardList((prevState) => [
            ...prevState,
            ...creditCards
        ]);
    }
    
    React.useEffect(() => {
        const updateLocalStorage = async() => {
            try {
                await AsyncStorage.setItem('transactionHistory', JSON.stringify(transactionList));
            } catch (e) {
                console.log(e);
            }
        }
        if (updateTransactionList) {
            updateLocalStorage();
            setUpdateTransactionList(false);
            console.log('Updated TransactionHistory Internal Storage')
        } else {
            console.log('TransactionHistory Internal Storage not updated')
        }
    }, [transactionList])

    // Update specified credit card totalSpent amount
    const updateTotalSpentHandler = async(creditCard, amount) => {
        try {
            if (creditCardList !== null) {
                const index = creditCardList.indexOf(creditCard);
                setCreditCardList((prevState) => [
                    ...prevState.slice(),
                    prevState[index] = {
                        ...prevState[index],
                        totalSpent: amount
                    }
                ])
            } else {
                console.log('There is no such credit card');
            }
            await AsyncStorage.setItem('creditCardRecord', JSON.stringify(creditCardList));
        } catch (e) {
            console.error(e);
        }
    }
    
    const transactionRecordContext = React.useMemo(() => ({
        addTransaction: (transaction) =>{
            addNewTransactionHandler(transaction);
        },
        deleteTransaction: (transaction) =>{
            deleteTransactionHandler(transaction);
        },
        getTransactionList: () => {
            if (transactionList !== null) {
                return transactionList;
            } else {
                return [];
            }
        }
    }))

    const creditCardRecordContext = React.useMemo(() => ({
        addCreditCard: (creditCards) => {
            addNewCreditCardHandler(creditCards);
        },
        updateTotalSpent: (creditCard, amount) =>{
            updateTotalSpentHandler(creditCard, amount)
        },
        getCreditCardList: () => {
            if (creditCardList !== null) {
                return creditCardList;
            } else {
                return [];
            }
        }
    }))

    return (
        <>
            <CreditCardRecordContext.Provider value = {creditCardRecordContext} >
            <TransactionRecordContext.Provider value = {transactionRecordContext}>
                <NavigationContainer>
                    <BottomTab.Navigator tabBarOptions = {{showLable: false}} >
                        <BottomTab.Screen
                            name = "Wallet"
                            component = {WalletTab}
                            options = {{tabBarIcon: () =>
                                <Icon name = {'wallet'} type = {'material-community'}/>
                            }}
                        />
                        <BottomTab.Screen
                            name = "Home"
                            component = {HomeTab}
                            options = {{tabBarIcon: () =>
                                <Icon name = {'home'} type = {'entypo'}/>
                            }}
                        />
                        <BottomTab.Screen
                            name = "Cards"
                            component = {CardTab}
                            options = {{tabBarIcon: () =>
                                <Icon name = {'credit-card'} type = {'entypo'}/>
                            }}
                        />
                        <BottomTab.Screen
                            name = "Profile"
                            component = {ProfileTab}
                            options = {{tabBarIcon: () =>
                                <Icon name = {'account'} type = {'material-community'}/>
                            }}
                        />
                    </BottomTab.Navigator>
                </NavigationContainer>
            </TransactionRecordContext.Provider>
            </CreditCardRecordContext.Provider>
        </>
    )
}

export default App;