import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Wallet from '../screens/wallet';
import AddCardScreen from '../screens/addCardScreen';

const Stack = createStackNavigator();

const WalletTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Wallet" component = {Wallet} options = {{headerShown: false}}/>
            <Stack.Screen name = "AddCardScreen" component = {AddCardScreen} options = {{title: 'Select a card'}}/>
            {/* <Stack.Screen name = "History" component = {History} options = {{headerShown: false}}/> */}
        </Stack.Navigator>            
    )
}

export default WalletTab;