import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import {UserProfile} from './screens/userProfile';
import {RebateProgress} from './screens/rebateProgress';
import {ExpenseTracker} from './screens/expenseTracker';

const Tab = createBottomTabNavigator();

const WalletStack = createStackNavigator(); 
const WalletTab = () => {
    return (
        <WalletStack.Navigator>
            <WalletStack.Screen name ={ "Home"} component = {RebateProgress} options = {{headerShown: false}}/>
            {/* <HomeStack.Screen name = "AddCardScreen" component = {AddCardScreen} options = {{title: 'Select a card'}}/> */}
            {/* <Stack.Screen name = "History" component = {History} options = {{headerShown: false}}/> */}
        </WalletStack.Navigator>
    )
}

const HistoryStack  = createStackNavigator(); 
const HistoryTab = () => {
    return (
        <HistoryStack.Navigator>
            <HistoryStack.Screen name = {"Profile"} component = {ExpenseTracker} options = {{headerShown: false}}/>
        </HistoryStack.Navigator>
    )
}

const ProfileStack  = createStackNavigator(); 
const ProfileTab = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name = {"Profile"} component = {UserProfile} options = {{headerShown: false}}/>
        </ProfileStack.Navigator>
    )
}

export const Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name = "Wallet"
                    component = {WalletTab}
                    options = {{tabBarIcon: () => <Icon name = {'wallet'} type = {'material-community'}/>}}
                />
                <Tab.Screen
                    name = "History"
                    component = {HistoryTab}
                    options = {{tabBarIcon: () =>  <Icon name = {'account'} type = {'material-community'}/>}}
                />
                <Tab.Screen
                    name = "Profile"
                    component = {ProfileTab}
                    options = {{tabBarIcon: () =>  <Icon name = {'account'} type = {'material-community'}/>}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
