import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, TextInput } from 'react-native';

import { Icon } from 'react-native-elements';
import AddTransaction from '../../screens/addTransaction';

import NewTransactionContext from '../../util/newTransactionContext';

const SelectCategory = () => {

    const [ selectedCategory, setSelectedCategory ] = React.useState(null)

    const { setModal, setCategory, addTransaction } = React.useContext(NewTransactionContext)

    const categoryList = require('../../categories.json')

    return (
        <View style = {{height: '65%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 30,  borderBottomLeftRadius: 0, borderBottomRightRadius: 0, alignItems: 'center', paddingVertical: 10, flexDirection: 'column', margin: 0}}>
            <View style = {{alignItems: 'center', height: 70}}>
                <Text style = {{fontSize: 24, paddingBottom: 5}}>Spending Category</Text>
                <Text style = {{fontSize: 14}}>What did you purchase with this card?</Text>
            </View>
            <View style = {{marginBottom:5 }}>
                <View style ={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {categoryList.map((category, index) => {return (
                        <View style = {{alignItems: 'center', width: '33%', height: 80, padding: 5, justifyContent: 'center'}} key = {index}>
                            <View style = {[{width  : '95%', height: '95%', borderRadius:5, backgroundColor: '#D3D3D3', justifyContent: 'center', alignItems: 'center'}, selectedCategory === null ? null : (selectedCategory.id === category.id ? {backgroundColor: category.color} : null ) ]}>
                                <TouchableOpacity onPress = {() => {setCategory(category); setSelectedCategory(category)}} activeOpacity = {1}>
                                    <Icon name ={category.icon} type={category.type}/>
                                    <Text style ={{fontSize: 11.5}}>{category.name}</Text>                         
                                </TouchableOpacity>
                            </View>
                        </View>
                    )})}
                </View>
            </View>
            <View style = {{width: '95%'}}>
                <Text style = {{fontSize: 10}}>Unsure which category?</Text>
                <Text style = {{fontSize: 10}}>Select the merchant and we will do the rest</Text>
                <TextInput placeholder = {'Merchant Name'} style = {{padding: 5}}/>
            </View>
            <View style = {{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity style = {{flex: 1, alignItems: 'center'}} onPress = {() => {setModal(4); addTransaction()}}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelectCategory;