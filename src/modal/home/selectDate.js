import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, TextInput } from 'react-native';

import { Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';

import NewTransactionContext from '../../util/newTransactionContext';

var moment = require('moment');

const SelectDate = () => {

    const [selectedDate, setSelectedDate] = React.useState(moment());
    
    const { setModal, setDate } = React.useContext(NewTransactionContext);

    return (
        <View style = {{height: '65%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 30, alignItems: 'center', paddingVertical: 20}}>
            <View style = {{alignItems: 'center', height: 70}}>
                <Text style = {{fontSize: 24}}>Select Date</Text>
                <Text>{selectedDate.format('ddd D MMM')}</Text>
            </View>
            <View>
            <CalendarPicker width = {300}
                            previousComponent = {(<Icon name='chevron-left' type='material-community'/>)} 
                            nextComponent = {(<Icon name='chevron-right' type='material-community'/>)}
                            todayBackgroundColor = {'white'}
                            selectedStartDate = {selectedDate}
                            selectedDayColor = {'#00ffff'}
                            onDateChange = {(date) => {setSelectedDate(date);}}/>
            </View>
            <View style = {{flexDirection: 'row', marginVertical: 10}}>
                <TouchableOpacity style = {{flex: 1, alignItems: 'center'}} onPress = {() => {setModal(3);  setDate(selectedDate)}}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelectDate;