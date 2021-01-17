import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, TextInput, Alert } from 'react-native';

import { Icon } from 'react-native-elements';

import Toast from 'react-native-toast-message';

import NewTransactionContext from '../../util/newTransactionContext';
var moment = require('moment');


const SpendingDetails = (props) => {
    const [amountSpent, setAmountSpent] = React.useState(null)

    const createTwoButtonAlert = () =>
    Alert.alert(
        "Warning",
        "Please select a card",
      [
        { text: "OK"}
      ],
      { cancelable: false }
    );

    const { setAmount, setModal, setDate } = React.useContext(NewTransactionContext);

    return (
        <View style = {{height: '65%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 30, alignItems: 'center', paddingVertical: 20}}>
            <View style = {{alignItems: 'center', height: 70}}>
                <Text style = {{fontSize: 24}}>Spending Details</Text>
                <Text>How much did you spend on this card?</Text>
            </View>
            <View style = {{flexDirection : 'row', marginVertical:30, height: 70}}>
                <View style = {{ margin:5, flex : 2}}>
                    <View style = {{backgroundColor: props.summary.card.colorCode, flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                        <Text style = {{color: 'white'}}>{props.summary.card.bank}</Text>
                    </View>
                </View>
                <View style = {{margin: 5, flex : 3, justifyContent: 'center'}}>
                    <TextInput placeholder = {'Amount'} style ={{ borderWidth: 2, borderRadius: 10, padding: 10, borderColor: '#bdbdbd'}} keyboardType = {'numeric'} onChangeText = {(amount) => {amount === '' ? setAmountSpent(null) : setAmountSpent(amount); console.log(amountSpent)}}></TextInput>
                </View>
            </View>
            <View >
                <View style = {{alignItems : 'center'}}>
                    <Text>Did you make this purchase today?</Text>
                </View>
                <View style = {{flexDirection: 'row', width: '100%'}}>
                    <View style = {{alignItems : 'center', marginVertical: 20, flex :1}}>
                        <TouchableOpacity style ={{margin:5, padding: 10, width: '50%', alignItems: 'center', borderRadius: 10, backgroundColor: '#9100d4'}} onPress = {() => {setAmount(amountSpent); setDate(moment()); setModal(3)}}>
                            <Text style = {{color: 'white'}}>Yes</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity style ={{margin:5, padding: 10, width: '50%', alignItems: 'center', borderRadius: 10, backgroundColor: '#00c0e6'}} onPress = {() => {setAmount(amountSpent); setModal(2);}}>
                            <Text style = {{color: 'white'}}>Select Other Date</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SpendingDetails;