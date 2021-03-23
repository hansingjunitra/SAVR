import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {CredentialsContext} from '../context';

export const CredentialsInput = () => {
    const [name, setName] = React.useState(null);
    const {createNewUser} = React.useContext(CredentialsContext);
    return (
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style ={{fontSize: 36}}>Enter username</Text>
            <TextInput onChangeText={(input) => setName(() =>input)} value={name} placeholder={'Username'} style= {{alignSelf: 'center', width: '80%', height: 40, margin: 12, borderWidth: 1}}/>    
            <TouchableOpacity onPress = {() => createNewUser(name)}>
              <View style= {{alignSelf: 'center', width: '80%', height: 40, margin: 12, borderWidth: 1, justifyContent: 'center', padding: 20}}>
                <Text>Confirm</Text>
              </View>
            </TouchableOpacity>
        </View>
  )
} 

        {/*  */}
          {/* </View> */}
