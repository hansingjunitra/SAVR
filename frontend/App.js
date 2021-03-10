import React from 'react';

import { View, Image, Dimensions } from 'react-native';
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
import { SafeAreaView } from 'react-native';

const BottomTab = createBottomTabNavigator();

const App = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [transactionList, setTransactionList] = React.useState([]);
    const [creditCardList, setCreditCardList] = React.useState([]);

    const [creditCardInformation, setCreditCardInformation] = React.useState([]);
    
    const [updateTransactionList, setUpdateTransactionList] = React.useState(false);
    const [updateCreditCardList, setUpdateCreditCardList] = React.useState(false);
    
    const [retrieved, setRetrieved] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    
    /*
        Handle application first load.
        Fetch data from internal storage, while fetching display splash screen.
    */
    React.useEffect(() => {
        const getTransactionHistory = async() => {
            console.log('First Retrieve')
            try {
                const transactionRecord = JSON.parse( await AsyncStorage.getItem('transactionHistory'));
                if (transactionRecord === null) {
                    setTransactionList([]);
                } else {
                    setTransactionList(transactionRecord);
                }

                const creditCardRecord = JSON.parse( await AsyncStorage.getItem('creditCardRecord'));
                if (creditCardRecord === null) {
                    setCreditCardList([]);
                } else {
                    setCreditCardList(creditCardRecord);
                }
            } catch (e) {
                console.error(e);
            }
        }

        const getCreditCardInformation = async () => {
            fetch("http://localhost:3000/creditcards")
            .then(response => response.json())
            .then(data => {
                setCreditCardInformation(data);
            })
            .catch(err => console.error(err))
        }

        const getFirstLoad = () => {
            if (!retrieved) {
                getTransactionHistory().then(console.log('Initialized List'));
                getCreditCardInformation().then(console.log('Received Card Info from backend.'));
                setRetrieved(true);
                setIsLoading(false);
            }
        }

        setTimeout(getFirstLoad, 2000);

    }, [retrieved]);
  
    /*
        Update the credit card internal storage when creditCardList changes except when first load
    */ 
    React.useEffect(() => {
        if (updateCreditCardList) {
            const updateLocalStorage = async() => {
                try {
                    await AsyncStorage.setItem('creditCardRecord', JSON.stringify(creditCardList));
                } catch (e) {
                    console.log(e);
                }
            }
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
    
    /*
        Update the internal storage when transasctionList changes except when first load
        Args : creditcCards obj []
    */ 

    const addNewCreditCardHandler = (creditCardList) => {
        setUpdateCreditCardList(true);

        let res = [];
        creditCardList.map((creditCard, index) => {
            res.append({
                id: creditCard.id,
                
            })
        })

        setCreditCardList((prevState) => [
            ...prevState,
            ...creditCards
        ]);
    }
    
    /*
        Update the transaction history internal storage when transactionList changes except when first load
    */ 
    React.useEffect(() => {
        if (updateTransactionList) {
            const updateLocalStorage = async() => {
                try {
                    await AsyncStorage.setItem('transactionHistory', JSON.stringify(transactionList));
                } catch (e) {
                    console.log(e);
                }
            }
            updateLocalStorage();
            setUpdateTransactionList(false);
            console.log('Updated TransactionHistory Internal Storage')
        } else {
            console.log('TransactionHistory Internal Storage not updated')
        }
    }, [transactionList])

    const updateTotalSpentHandler = (selectedCreditCard, newTransaction) => { 
        setUpdateCreditCardList(true);
        if (creditCardList !== null) {
            const creditCardIndex = creditCardList.findIndex((creditCard) => creditCard['name'] == selectedCreditCard['name']);
            const categoryIndex = creditCardList[creditCardIndex]['cashbacks'].findIndex((cashback) => cashback['eligibility'] == newTransaction['category']['name'])
            setCreditCardList((prevState) => [
                ...prevState.slice(0, creditCardIndex),
                {
                    ...prevState[creditCardIndex],
                    totalSpent: prevState[creditCardIndex]['totalSpent'] + parseInt(newTransaction.amount.value),
                    cashbacks: [
                        ...prevState[creditCardIndex]['cashbacks'].slice(0, categoryIndex),
                        {
                            ...prevState[creditCardIndex]['cashbacks'][categoryIndex],
                            spent: prevState[creditCardIndex]['cashbacks'][categoryIndex]['spent'] + parseInt(newTransaction.amount.value)
                        },
                        ...prevState[creditCardIndex]['cashbacks'].slice(categoryIndex + 1)
                    ]
                },
                ...prevState.slice(creditCardIndex + 1)
            ])
        } else {
            console.log('There is no such credit card');
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
            console.log('Retrieving transactionList')
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
        updateTotalSpent: (creditCard, newTransaction ) =>{
            updateTotalSpentHandler(creditCard, newTransaction);
        },
        getCreditCardList: () => {
            if (creditCardList !== null) {
                return creditCardList;
            } else {
                return [];
            }
        },
        getCreditCardInformation: () => {
            return creditCardInformation;
        }
    }))

    const splashScreen = require('./src/assets/splashscreen.jpg')

    // if (isLoading) {
    //     console.log('Using Splash Screen', new Date())
    //     return (
    //         <View style = {{flex: 1}}>
    //             <Image source = {splashScreen} style = {{height: '100%', width: '100%'}}></Image>
    //         </View>
    //     )
    // }

    return (
        <>
            {isLoading ? 
            <View>
                <Image source = {splashScreen} style = {{height: windowHeight, width: windowWidth, alignSelf: 'center'}}></Image>
                {/* 4688 x 10150 */}
            </View> : null}
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
