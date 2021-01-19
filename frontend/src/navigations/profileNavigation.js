import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../screens/profile';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Profile" component = {Profile} options = {{headerShown: false}}/>
        </Stack.Navigator>            
    )
}

export default ProfileNavigator;