import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/home';
import AddTransaction from '../screens/addTransaction';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Home" component = {Home} options = {{headerShown: false}}/>
            <Stack.Screen name = "AddTransaction" component = {AddTransaction} options = {{headerShown: false}}/>
        </Stack.Navigator>            
    )
}

export default HomeNavigator;