import React from 'react';
import { View, Text, Button, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView, Modal, StyleSheet, TouchableHighlight, Alert, TextInput } from 'react-native';

import { Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

var moment = require('moment');

const AddTransaction = ({route, navigation}) => {

    const card = route.params;

    const [value, setValue] = React.useState({
        amount: 20,
        category: null,
        description: null,
        date: null
    })

    const [selectedDate, setSelectedDate] = React.useState(moment());
    const [selectedCategory, setSelectedCategory] = React.useState('Others')

    const [calendarModal, setCalendarModal] = React.useState(false);
    const [categoryModal, setCategoryModal] = React.useState(false);

    const [categoryList, setCategoryList] = React.useState()

    return (
        <KeyboardAvoidingView style = {[{flex: 1, flexDirection: 'column'}, calendarModal ? {backgroundColor: 'rgba(0,0,0,0.5)'} : null]}>
            <View style = {{margin: 15, flex: 1}}>
                <View style = {{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    {/* <Text style = {{fontSize: 36}}> $ 20 </Text> */}
                    <Text style = {{fontSize: 54}}>$</Text>
                    <TextInput placeholder = {'0'} placeholderTextColor = {'black'} keyboardType={'decimal-pad'} style = {{fontSize: 54}}/>
                </View>
                <View style = {{flex: 1}}>
                    <View style = {{marginVertical: 10}}>
                        <TouchableOpacity onPress = {() => setCategoryModal(true)}>
                            <View style = {{flexDirection: 'row'}}>
                                <View  style = {{flex: 1}}>
                                        <Text style = {{fontSize: 20}}> Category </Text>
                                </View>
                                <Text>{value.category === null ? 'None' : value.category}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {{marginVertical: 10}}>
                        <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                            <View  style = {{flex: 1, justifyContent: 'center'}}>
                                <Text style = {{fontSize: 20}}> Description </Text>
                            </View>
                            <TextInput placeholder={'None'} style = {{padding: 0, margin: 0}} placeholderTextColor = {'black'}/>
                        </View>
                    </View>
                    <View style = {{marginVertical: 10}}>
                        <TouchableOpacity onPress = {() => setCalendarModal(true)} >
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{flex: 1}} >
                                    <Text style = {{fontSize: 20}}> Date </Text>
                                </View>
                                <Text>
                                    {value.date === null ? 'None' : value.date.format('D MMM YYYY')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <TouchableOpacity style = {{flex: 1}}>
                        <Icon name='check' type='material-community'/>
                    </TouchableOpacity>  
                    <TouchableOpacity style = {{flex: 1}} onPress = {() => navigation.navigate('Home')}>
                        <Icon name='close' type='material-community'/>
                    </TouchableOpacity>  
                </View>
            </View>
            <Modal transparent={true} visible = {categoryModal}>
                <View style = {{flex: 1, justifyContent : 'center', alignItems : 'center'}}>
                    <View style = {{backgroundColor: 'white' , justifyContent : 'center', margin:10, borderRadius: 20, width:'85%'}}>
                        <View style = {{margin: 10 }} >
                            <Text style = {{fontSize: 16}}>{selectedCategory}</Text>
                        </View>
                        <View style = {{margin: 10, flexDirection: 'row', flexWrap: "wrap"}}>
                            {categoryList.map((category, index) => {return (<View key={index} style = {{margin: 5, borderColor: 'blue', borderWidth: 1, padding: 5, borderRadius: 10, justifyContent: 'center'}}>
                                                                                <TouchableOpacity onPress = {() => {setSelectedCategory(category);}}>
                                                                                    <Text>
                                                                                        {category}
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                            </View>)})}
                            <View style = {{margin:10, borderColor: 'blue', borderWidth: 1, padding: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
                                <Text>Add Category</Text>
                                <Icon  name='plus' type='material-community' size = {20}/>
                            </View>
                        </View>
                        <View style = {{ flexDirection : 'row', marginVertical: 20}}>
                            <TouchableOpacity style = {{flex: 1 , alignItems: 'center'}} onPress = {() => {setSelectedCategory('Others'); setCategoryModal(false)} }>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {{flex: 1 , alignItems: 'center'}} onPress = {() => {setValue(prevValue => {return {
                                                                                                                                ...prevValue,
                                                                                                                                category: selectedCategory
                                                                                                                                }});
                                                                                                            console.log(selectedCategory);
                                                                                                            setCategoryModal(false)}}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} visible = {calendarModal}>
                <View style = {{flex: 1, justifyContent : 'center', alignItems : 'center'}}>
                    <View style = {{backgroundColor: 'white' , justifyContent : 'center', margin:10, borderRadius: 20, width:'85%'}}>
                        <View style = {{margin: 10 }} >
                            <Text style = {{fontSize: 16}}>{selectedDate.format('YYYY')}</Text>
                            <Text style = {{fontSize: 24, marginBottom: 8}}>{selectedDate.format('ddd D MMM')}</Text>
                        </View>
                        <CalendarPicker width = {300}
                                        previousComponent = {(<Icon name='chevron-left' type='material-community'/>)} 
                                        nextComponent = {(<Icon name='chevron-right' type='material-community'/>)}
                                        todayBackgroundColor = {'white'}
                                        selectedStartDate = {selectedDate}
                                        selectedDayColor = {'#00ffff'}
                                        onDateChange = {(date) => setSelectedDate(date)}/>
                                        
                        <View style = {{ flexDirection : 'row', marginVertical: 20}}>
                            <TouchableOpacity style = {{flex: 1 , alignItems: 'center'}} onPress = {() => {setSelectedDate(moment()); setCalendarModal(false)} }>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {{flex: 1 , alignItems: 'center'}} onPress = {() => {setValue(prevValue => {return {
                                                                                                                                ...prevValue,
                                                                                                                                date: selectedDate
                                                                                                                                }});
                                                                                                            setCalendarModal(false)}}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

export default AddTransaction