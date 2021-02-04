import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import History from '../screens/history';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Profile" component = {History} options = {{headerShown: false}}/>
        </Stack.Navigator>            
    )
}

export default ProfileNavigator;