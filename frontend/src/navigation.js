import React from 'react';
import { View, Modal, Text, Image } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import {UserProfile} from './screens/userProfile';
import {RebateProgress} from './screens/rebateProgress';
import {ExpenseTracker} from './screens/expenseTracker';
import {AddCard} from './screens/addCard';
import {EditTransaction} from './screens/editTransaction';
import {AddTransaction} from './screens/addTransaction';
import {TrackProgress} from './screens/trackProgress';
import {Recommendation} from './util/recommendation';

const Tab = createBottomTabNavigator();

const WalletStack = createStackNavigator(); 
const WalletTab = () => {
    return (
        <WalletStack.Navigator>
            <WalletStack.Screen name ={"Home"} component = {RebateProgress} options = {{headerShown: false}}/>
            <WalletStack.Screen name = {"EditTransactionScreen"} component = {EditTransaction} options = {{headerShown: false}}/>
            <WalletStack.Screen name = {"AddTransactionScreen"} component = {AddTransaction} options = {{headerShown: false}}/>
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
            <HistoryStack.Screen name = {"EditTransactionScreen"} component = {EditTransaction} options = {{headerShown: false}}/>
            <HistoryStack.Screen name = {"AddTransactionScreen"} component = {AddTransaction} options = {{headerShown: false}}/>
        </HistoryStack.Navigator>
    )
}

const RecommendationStack  = createStackNavigator(); 
const RecommendationTab = () => {
    return (
        <RecommendationStack.Navigator>
            <RecommendationStack.Screen name = {"Recommend"} component = {Recommendation}/>        
        </RecommendationStack.Navigator>
    )
}

const ProfileStack  = createStackNavigator(); 
const ProfileTab = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name = {"Profile"} component = {UserProfile} options = {{headerShown: false}}/>
            <ProfileStack.Screen name = {"AddCard"} component = {AddCard} options = {{headerShown: false}}/>
        </ProfileStack.Navigator>
    )
}

const TrackStack = createStackNavigator();
const TrackTab = () => {
    return (
        <TrackStack.Navigator>
            <TrackStack.Screen name = {"TrackScreen"} component = {TrackProgress} options = {{headerShown: false}}/>
        </TrackStack.Navigator>
    )
}

export const Navigator = () => {

    const [modal, setModal] = React.useState(false);

    return (
        <>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name = "Cards"
                        component = {WalletTab}
                        options = {{tabBarIcon: () => <Icon name = {'credit-card-multiple'} type = {'material-community'}/>}}
                    />
                    <Tab.Screen
                        name = "History"
                        component = {HistoryTab}
                        options = {{tabBarIcon: () =>  <Icon name = {'view-list-outline'} type = {'material-community'}/>}}
                    />
                    <Tab.Screen
                        name = "Recommend"
                        component = {RecommendationTab}
                        listeners = {{
                            tabPress: e => {
                                e.preventDefault();
                                setModal(true);
                            },
                        }}
                        options = {{tabBarIcon: () =>  
                            <View
                                style={{
                                position: 'absolute',
                                bottom: 0, // space from bottombar
                                height: 75,
                                width: 75,
                                borderRadius: 75,
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}>
                                <Image
                                source={require('../src/assets/recommendationlogo-01-01.png')}
                                style = {{
                                    width: 75,
                                    height: 75,
                                    borderWidth: 2, 
                                    borderRadius: 75,
                                    borderColor: '#efefef'
                                }}
                                />
                                {/* <Icon name = {'circle-outline'} type = {'material-community'}  style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: '#f1f6f9',
                                    alignContent: 'center',
                                }}/> */}
                            </View>
                        , 
                                    tabBarLabel: () => null, 
                                    }}
                    />
                    <Tab.Screen
                        name = "Track"
                        component = {TrackTab}
                        options = {{tabBarIcon: () =>  <Icon name = {'bar-graph'} type = {'entypo'}/>}}
                    />
                    <Tab.Screen
                        name = "Profile"
                        component = {ProfileTab}
                        options = {{tabBarIcon: () =>  <Icon name = {'account'} type = {'material-community'}/>}}
                    />
                </Tab.Navigator>
            </NavigationContainer>
            <Recommendation modal = {modal} setModal = {setModal}/>
        </>
    )
}