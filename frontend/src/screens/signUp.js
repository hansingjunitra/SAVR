import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import { AppContext } from '../context/context';
import { Icon } from 'react-native-elements';

export const SignUp = () => {
    const [name, setName] = React.useState(null);

    const { state, dispatch } = useContext(AppContext);

    return (
        <SafeAreaView style = {{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <Text style ={{fontSize: 24}}>Enter username</Text>
            <TouchableOpacity style = {{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name = {'account-outline'} type = {'material-community'} size = {30} style = {{marginHorizontal: 10}}/>
              {/* <Text style = {{fontSize: 18, flex: 1}}>Account Details</Text> */}
              <TextInput onChangeText={(input) => setName(() =>input)}  value={name} placeholder={'Username'}  style= {{alignSelf: 'center', paddingLeft: 15, width: '80%', height: 40, margin: 12, borderWidth: 1, borderRadius: 20, borderColor: '#bbb'}}/>    
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => dispatch({type: "SET_CREDENTIALS"})}>
              <View style= {{alignSelf: 'center', width: 80, height: 40, borderRadius: 10, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 10, borderColor: '#01a699'}}>
                <Text style = {{textAlign: 'center', color: "#01a699"}}>Confirm</Text>
              </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
} 