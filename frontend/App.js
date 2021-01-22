import React from 'react';
import { View, Text, SafeAreaView, TouchableHighlight, ScrollView, StyleSheet, Modal, Alert } from 'react-native';

import HomeTab from './src/navigations/homeNavigation';
import ProfileTab from './src/navigations/profileNavigation';
import CardTab from './src/navigations/cardNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import Toast from 'react-native-toast-message';

const toastConfig = {
  success: ({ text1, props, ...rest }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
      <Text>{text1}</Text>
      <Text>{props.guid}</Text>
    </View>
  ),
  error: () => {},
  info: () => {},
  any_custom_type: () => {}
};

const BottomTab =  createBottomTabNavigator();

const App = () => {
    return (
      <>
        <NavigationContainer>
            <BottomTab.Navigator tabBarOptions = {{showLabel: false}}>
              <BottomTab.Screen 
                name = "Home" 
                component = {HomeTab} 
                options = {{
                  tabBarIcon: () => 
                    <Icon name ={'home'} type={'entypo'}/>
                  
                }}/>
              <BottomTab.Screen 
                name = "Cards" 
                component = {CardTab} 
                options = {{
                  tabBarIcon: ({color, size}) => 
                    <Icon name ={'credit-card'} type={'entypo'}/>
                }}/>
              <BottomTab.Screen 
                name = "Profile" 
                component = {ProfileTab} 
                options = {{
                  tabBarIcon: ({color, size}) => 
                    <Icon name ={'account'} type={'material-community'}/>
                }}/>
            </BottomTab.Navigator>
        </NavigationContainer>
        <Toast config = {toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </>
    );
  };

export default App;