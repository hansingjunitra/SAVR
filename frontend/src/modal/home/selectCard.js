import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, ScrollView, StyleSheet, TouchableHighlight, TextInput } from 'react-native';

import { Icon } from 'react-native-elements';

import NewTransactionContext from '../../util/newTransactionContext';

const SelectCard = () => {

    const [selectedCard, setSelectedCard]  = React.useState(
        {id: null, bank: null, colorCode: null}
    );

    const { setCard, setModal } = React.useContext(NewTransactionContext);

    const cardList = [{id: 1, bank: 'DBS', colorCode: '#000000'}, {id: 2, bank: 'UOB', colorCode: '#0c4f75'}, {id: 3, bank: 'OCBC', colorCode: '#d10022'}]
    return (
        <View style = {{height: '65%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 30, alignItems: 'center', paddingVertical: 10}}>
            <View style = {{alignItems: 'center', height: '15%', justifyContent: 'center'}}>
                <Text style = {{fontSize: 28}}>Select Card</Text>
                <Text>Which card did you use for spending?</Text>
            </View>
            <View style = {{height: '70%', paddingVertical: 10}}>
                <ScrollView showsVerticalScrollIndicator= {true}>
                    <View style = {{ alignContent: 'stretch',  flex: 1, flexWrap: "wrap",flexDirection: "row"} } onStartShouldSetResponder = {()=>true}>
                        {cardList.map((card, index) => {return (
                            <View key = {index} style = {{width : '50%', padding: 5, height: 100}}>
                                <TouchableOpacity style = {[{backgroundColor: card.colorCode + '77', flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10}, selectedCard.id === card.id ? {borderWidth: 2, borderColor: 'black', backgroundColor: card.colorCode} : null]} onPress = {() => setSelectedCard(card)}>
                                    <View >
                                        <Text style = {{color: 'white'}}>{card.bank}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )})}
                    </View>
                </ScrollView>
            </View>
            <View style = {{height: '15%', justifyContent: 'center', width: '40%'}}>
                <TouchableOpacity style = {{margin:10, padding: 10, backgroundColor: '#2196F3', borderRadius: 10, alignItems: 'center'}} onPress = {() => {setCard(selectedCard); setModal(1)}}>
                        <Text style = {{color: 'white'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelectCard;