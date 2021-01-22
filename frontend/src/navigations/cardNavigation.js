import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import CardGoals from '../screens/cardGoals';

const Stack = createStackNavigator();

const CardNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Cards" component = {CardGoals} options = {{headerShown: false}}/>
        </Stack.Navigator>            
    )
}

export default CardNavigator;