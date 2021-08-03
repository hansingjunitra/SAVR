import React, { useContext } from 'react';
import { View,
        StyleSheet, 
        Text, 
        TouchableOpacity, 
        ScrollView, 
        SafeAreaView} from 'react-native';
import {AppContext} from '../context/context';

import {createConnection, getConnectionAccounts, getCustomerConnections, getTransactions} from '../saltedge';
import { AddCard } from './addCard';
import { savrAlgo } from '../util/algo';
import { Button } from 'react-native';
import { getConnectionIDListHandler } from '../context/method/credentials';
import { Icon,
         Divider } from 'react-native-elements';
import { fonts } from 'react-native-elements/dist/config';

const cardDetailsJSON = require('../creditCards.json');

const TextBox = (props) => {
    const { text, fontSize } = props
    return (
        <View style = {{flex: 1, justifyContent: 'center'}}>
            <Text style = {{fontSize: fontSize}}>{text}</Text>
        </View>
    )
}

export const UserProfile = ({navigation}) => {
    const { state, dispatch } = useContext(AppContext);

    React.useEffect(() => {
        console.log('Render userProfile.js UseEffect');
    }, [])
    
    const deleteHandler = async () => {
        try {
            await AsyncStorage.removeItem("APP_STATE");
            return true;
        }
        catch(exception) {
            return false;
        }
    }
    
    return (
        <ScrollView>
        <SafeAreaView style = {{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 25}}>
            <View style= {{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name = {'account'} type = {'material-community'} color= "white" size = {80} style = {{backgroundColor: '#ddd', borderRadius: 100, height: 100, width: 100, justifyContent: 'center'}}/>
                {/* <Text>{state.username}</Text> */}
            </View>
            <View style = {{height: 200, width: "100%", paddingVertical: 10, backgroundColor: '#eaeaea', marginVertical: 20, alignItems: 'center', borderRadius: 30}}>
                {/* <Text style ={{fontSize: 20, flex: 1}}>Account</Text> */}
                <View style = {{flex: 1, justifyContent: 'center'}}>
                    <Text style = {{fontSize: 24}}>Account</Text>
                </View>
                <Divider orientation="vertical" width="85%"/>
                <View style = {{flex: 1, flexDirection: 'row',  paddingHorizontal: 20}}>
                    <TouchableOpacity style = {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name = {'account-outline'} type = {'material-community'} size = {30} style = {{marginHorizontal: 10}}/>
                    <Text style = {{fontSize: 18, flex: 1}}>Account Details</Text>
                    </TouchableOpacity>
                </View>
                <Divider orientation="vertical" width="85%"/>
                <View style = {{flex: 1, flexDirection: 'row',  paddingHorizontal: 20}}>
                    <TouchableOpacity onPress={()=> navigation.navigate("AddCard")} style = {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name = {'credit-card-multiple-outline'} type = {'material-community'} size = {30} style = {{marginHorizontal: 10}}/>
                        <Text style = {{fontSize: 18, flex: 1}}>Add Cards</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{height: 200, width: "100%", paddingVertical: 10, backgroundColor: '#eaeaea', marginVertical: 20, alignItems: 'center', borderRadius: 30}}>
                {/* <Text style ={{fontSize: 20, flex: 1}}>Account</Text> */}
                <View style = {{flex: 1, justifyContent: 'center'}}>
                    <Text style = {{fontSize: 24}}>About Us</Text>
                </View>
                <Divider orientation="vertical" width="85%"/>
                <View style = {{flex: 1, flexDirection: 'row',  paddingHorizontal: 20}}>
                    <TouchableOpacity style = {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name = {'customerservice'} type = {'antdesign'} size = {30} style = {{marginHorizontal: 10}}/>
                    <Text style = {{fontSize: 18, flex: 1}}>Customer Support</Text>
                    </TouchableOpacity>
                </View>
                <Divider orientation="vertical" width="85%"/>
                <View style = {{flex: 1, flexDirection: 'row',  paddingHorizontal: 20}}>
                    <TouchableOpacity style = {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name = {'file-document-outline'} type = {'material-community'} size = {30} style = {{marginHorizontal: 10}}/>
                        <Text style = {{fontSize: 18, flex: 1}}>Terms and Condition</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flex: 1, flexDirection: 'row',  paddingHorizontal: 20}}>
                <TouchableOpacity onPress={()=> dispatch({type: "RESET_STATE"})} style = {{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style = {{fontSize: 18, flex: 1}}>Hard Reset</Text>
                </TouchableOpacity>
            </View>
           </SafeAreaView>
        </ScrollView>
    )
}