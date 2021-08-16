import React from 'react';
import { getCustomerConnections } from '../saltedge';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                // saltEdgeID: "424595968315361542",
                saltEdgeID: "537665252997728379"
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
                transactionList: [action.data, ...state.transactionList]
            }
            break;
        case "EDIT_TRANSACTION":
            // console.log(transactionList)
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
        case "EDIT_CATEGORY":
            const today = new Date()

            let updatedTotalSpent = action.data.card.totalSpent;
            let updatedSpendingBreakdown = action.data.card.spendingBreakdown;
            let newTransactionList = state.transactionList.map((t) => {
                if (t.description === action.data.description) {
                    if (action.data.transactionId !== t.id) {
                        if ((( new Date(t.date).getMonth() == 6  && new Date(t.date).getDate() > 21) ||  new Date(t.date).getMonth() == 7) && today.getFullYear() == new Date(t.date).getFullYear()) {
                            updatedSpendingBreakdown[`${action.data.oldCategory}`] -= t.amount
                            updatedSpendingBreakdown[`${action.data.newCategory}`] += t.amount
                        }
        
                    }
                    return (
                        {...t, 
                            category : action.data.newCategory,
                            icon: action.data.icon} 
                    )                        
                } else {
                    return (
                        t
                    )
                }
        })

            let updatedCard = {
                ...action.data.card,
                spendingBreakdown: updatedSpendingBreakdown
            }
            let cardIndex = state.cardList.findIndex((c) => c.id == action.data.card.id)
            newState = {
                ...state,
                transactionList: newTransactionList,
                cardList: [...state.cardList.slice(0, cardIndex), updatedCard, ...state.cardList.slice(cardIndex + 1)]
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
         AppContextConsumer }