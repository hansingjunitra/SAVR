import React, { useContext } from 'react';
import {View, TextInput, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {CredentialsContext, AppContext} from '../context/context';

export const SignUp = () => {
    const [name, setName] = React.useState(null);
    // const {createNewUser} = React.useContext(CredentialsContext);
    const {state, dispatch} = useContext(AppContext);
    console.log(state, dispatch)

    return (
        <SafeAreaView style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style ={{fontSize: 36}}>Enter username</Text>
            <TextInput onChangeText={(input) => setName(() =>input)} value={name} placeholder={'Username'} style= {{alignSelf: 'center', width: '80%', height: 40, margin: 12, borderWidth: 1}}/>    
            <TouchableOpacity onPress = {() => dispatch({type: "SET_CREDENTIALS"})}>
              <View style= {{alignSelf: 'center', width: '80%', height: 40, margin: 12, borderWidth: 1, justifyContent: 'center', padding: 10}}>
                <Text style = {{fontSize: 12}}>Confirm</Text>
              </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
} 