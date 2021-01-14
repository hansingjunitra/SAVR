import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, TextInput } from 'react-native';

import { Icon } from 'react-native-elements';

import NewTransactionContext from '../../util/newTransactionContext';

const TransactionSummary = (props) => {

    const { setModal } = React.useContext(NewTransactionContext);

    return (
        <View style = {{height: '65%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 30,  borderBottomLeftRadius: 0, borderBottomRightRadius: 0, alignItems: 'center', paddingVertical: 10, flexDirection: 'column', margin: 0}}>
            <View style = {{alignItems: 'center', height: '15%', justifyContent: 'center'}}>
                <Text style = {{fontSize: 24, paddingBottom: 5}}>Transaction Added!</Text>
            </View>
            <View style = {{marginBottom:5, height: '25%',  marginHorizontal: 20}}>
                <View style = {{flexDirection: 'row', flex: 1, width: '100%'}}>
                    <View style = {{flex :2, alignContent: 'flex-start'}}>
                        <Text>Amount</Text>
                    </View>
                    <View style = {{flex :1, alignContent: 'flex-start'}}>
                        <Text style = {{fontWeight: "bold"}}>$ {props.summary.amount}</Text>
                    </View>
                </View>
                <View style = {{flexDirection: 'row', flex: 1, width: '100%'}}>
                    <View style = {{flex :2, alignContent: 'flex-start'}}>
                        <Text>Date</Text>
                    </View>
                    <View style = {{flex :1, alignContent: 'flex-start'}}>
                        <Text style = {{fontWeight: "bold"}}>{props.summary.date.format('DD/MM/YYYY')}</Text>
                    </View>
                </View>
                <View style = {{flexDirection: 'row', flex: 1, width: '100%'}}>
                    <View style = {{flex :2, alignContent: 'flex-start'}}>
                        <Text>Category</Text>
                    </View>
                    <View style = {{flex :1, alignContent: 'flex-start'}}>
                        <Text style = {{fontWeight: "bold"}}>{props.summary.category}</Text>
                    </View>
                </View>
            </View>
            <Text></Text>
            <View style = {{height: '40%', width: '60%'}}>
                <View style = {{flex: 1, marginVertical: 5}}>
                    <Text style = {{fontSize: 10}}>Total Spending Progress</Text>
                    <Text style = {{fontSize: 10}}>$345 / 500</Text>
                </View>
                <View style = {{justifyContent: 'center', alignItems:'center', flex: 3, backgroundColor: props.summary.card.colorCode, marginVertical: 10, borderRadius: 20}}>
                    <Text style = {{color: 'white'}}>{props.summary.card.bank}</Text>
                </View>
            </View>
            <View style = {{height: '20%', justifyContent: 'center',  width: '80%'}}>
                <TouchableOpacity style = {{backgroundColor: '#2196F3', padding: 10, borderRadius: 10}} onPress = {() => setModal(null)}>
                    <View style = {{alignItems: 'center',}}>
                        <Text style = {{color: 'white'}}>Dismiss</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TransactionSummary;