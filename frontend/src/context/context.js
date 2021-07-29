import React from 'react';
import { getCustomerConnections } from '../saltedge';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardContext =        React.createContext();
const TransactionContext = React.createContext();
const CredentialsContext = React.createContext();

const initialState = {
    token           : null,
    secret          : null,
    username        : null,
    saltEdgeID      : null,
    connectionIDList: [],
    transactionList : [],
    cardList        : []
};

const AppContext = React.createContext({
    state: initialState, 
    dispatch: () => null
});

const reducer = (state, action) => {
    let newState;
    let transactionIndex;
    
    switch (action.type) {
        case "SET_CREDENTIALS":
            newState=  {
                ...state,
                token: "491f970e1c69c8b7fced01e89c810d93eabc9f3d", 
                secret: "BTFCggxUJDBoPtMvjmKN-zcNWGY7xZUmIsdQps30eak",
                username: "Bobby", 
                saltEdgeID: "424595968315361542",
            }
            break;
        case "SET_CONNECTION_ID_LIST":
            newState =  {
                ...state, 
                connectionIDList: action.data
            }
            break;
        case "SET_APP_STATE":
            newState = action.data
            break;
        case "ADD_CARD":
            newState = {
                ...state,
                cardList: [...state.cardList, ...action.data]
            }
            break;
        case "UPDATE_CARD":
            newState = {
                ...state,
                cardList: [...state.cardList.filter((card) => card.id != action.data.id), action.data]
            }
            break;
        case "ADD_TRANSACTION":
            newState = {
                ...state,
                transactionList: [...state.transactionList, action.data]
            }
            break;
        case "EDIT_TRANSACTION":
            transactionIndex = state.transactionList.findIndex((t) => t.id === action.data.id) 
            if (transactionIndex != null) {
                newState = {
                    ...state,
                    transactionList: [...state.transactionList.slice(0, transactionIndex), action.data, ...state.transactionList.slice(transactionIndex + 1)]
                }    
            } 
            break;
        case "DELETE_TRANSACTION":
            transactionIndex = state.transactionList.findIndex((t) => t.id === action.data.id) 
            if (transactionIndex != null) {
                newState = {
                    ...state,
                    transactionList: [...state.transactionList.slice(0, transactionIndex), ...state.transactionList.slice(transactionIndex + 1)]
                }    
            } 
            break;
        case "UPDATE_TRANSACTION_LIST":
            newState = {
                ...state,
                transactionList: action.data
            }
            break;
        case "RESET_STATE":
            newState = initialState
            break;
        default:
            newState == {...state}
            break;
    }
    storeIntoStorage(newState);
    return newState;
}

const AppContextProvider = (props) => {
    const [ state, dispatch ] = React.useReducer(reducer, initialState)
    const { children } = props;

    return (
        <AppContext.Provider value = {{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

const storeIntoStorage = async (state) => {
    AsyncStorage.setItem('APP_STATE', JSON.stringify(state));
}

const AppContextConsumer = AppContext.Consumer;

export { AppContext,
         AppContextProvider, 
         AppContextConsumer,
         CardContext,
         CredentialsContext,
         TransactionContext,
         storeIntoStorage }