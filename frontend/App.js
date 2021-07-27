import React, { useContext } from 'react';
import {useState, useEffect, useMemo} from 'react';
import {Linking} from 'react-native';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigator} from './src/navigation';
import {SHA1} from './src/sha1';

import {SplashScreen} from './src/splashScreen';
import {SignUp} from './src/screens/signUp';
import {CardContext, TransactionContext, CredentialsContext, AppContextProvider, AppContext, AppContextConsumer} from './src/context/context';

import {createSaltEdgeCustomer, getCustomerConnections, getConnectionAccounts, getTransactions, refreshCustomerConnection} from './src/saltedge';
import { monthsShort } from 'moment'; 

import { getConnectionIDListHandler } from './src/context/credentials';
import { getCardConnectionAccount } from './src/context/card';

const getUniqueId = (username) => {
    const date = new Date().getTime().toString();
    const key = username + date;
    const hash = SHA1(key);
    return hash;
}

const App = () => {
    console.log("Render App.js")
    const [loading, setLoading] = useState(true);

    const {state, dispatch} = useContext(AppContext);

    
    useEffect(async () => {
        if (state.saltEdgeID !== null) {
            getConnectionIDListHandler(state.saltEdgeID).then(connectionIDList => {dispatch({type: "SET_CONNECTION_ID_LIST", data: connectionIDList}); console.log(connectionIDList)});
        }
        return
    }, [state.saltEdgeID])
    
    useEffect(async () => {
        const getFromStorage = async () => {
            let res = null;
            try {
                await AsyncStorage.getItem('APP_STATE').then((APP_STATE) => {
                    if (APP_STATE !== null) {
                        dispatch({type: "SET_APP_STATE", data: JSON.parse(APP_STATE)});
                        res = APP_STATE;
                    }
                });
            } catch (err) {
                console.error(err);
            }
            return res;
        }
        getFromStorage();

        setTimeout(() => setLoading(false), 500);
        return () => {
            console.log('Closing Application')
        }
    }, [])


    if (loading) {
        return (
            <SplashScreen/>
        )
    }

    return (
        <>
            {/* <CardContext.Provider value = {CardContextValue}>
            <TransactionContext.Provider value = {TransactionContextValue}>
            <CredentialsContext.Provider value = {CredentialsContextValue}> */}
            {loading ? <SplashScreen/>: null}
            {state.username === null ?  <SignUp/> : <Navigator/>}
            {/* </CredentialsContext.Provider>
            </TransactionContext.Provider>
            </CardContext.Provider> */}
        </>
    )
}

export default App;
