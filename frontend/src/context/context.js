import React from 'react';

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
    switch (action.type) {
        case "SET_CREDENTIALS":
            console.log("Executed")
            return {
                ...state,
                token: "491f970e1c69c8b7fced01e89c810d93eabc9f3d", 
                secret: "BTFCggxUJDBoPtMvjmKN-zcNWGY7xZUmIsdQps30eak",
                username: "Bobby", 
                saltEdgeID: "424595968315361542",
            }
        default:
            return {
                initialState
            }
    }
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

const AppContextConsumer = AppContext.Consumer;

export { AppContext,
         AppContextProvider, 
         AppContextConsumer,
         CardContext,
         CredentialsContext,
         TransactionContext }