import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeNavigator from './homeNavigation';

import CardGoals from '../screens/cardGoals';
import Profile from '../screens/profile';

const Tab = createBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Card Goals" component={CardGoals} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default TabBar;