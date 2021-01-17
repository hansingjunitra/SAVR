import React from 'react';
import { View, Text, SafeAreaView, TouchableHighlight, ScrollView, StyleSheet, Modal, Alert } from 'react-native';

import HomeNavigator from './src/navigations/homeNavigation';
import { NavigationContainer } from '@react-navigation/native';
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

const App = () => {
    return (
      <NavigationContainer>
        <HomeNavigator></HomeNavigator>
        <Toast config = {toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  
  export default App;