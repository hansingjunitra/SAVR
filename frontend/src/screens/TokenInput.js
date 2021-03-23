import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {TokenContext} from '../context';

export const TokenInput = () => {
    const [name, setName] = React.useState(null);
    const {setTokenName} = React.useContext(TokenContext);
    console.log(TokenContext);

    return (
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style ={{fontSize: 36}}>Enter username</Text>
            <TextInput onChangeText={(input) => setName(() =>input)} value={name} placeholder={'Username'} style= {{alignSelf: 'center', width: '80%', height: 40, margin: 12, borderWidth: 1}}/>    
            <TouchableOpacity onPress = {() => setName(name)}>
              <View style= {{alignSelf: 'center', width: '80%', height: 40, margin: 12, borderWidth: 1, justifyContent: 'center', padding: 20}}>
                <Text>Confirm</Text>
              </View>
            </TouchableOpacity>
        </View>
  )
} 

        {/*  */}
          {/* </View> */}
