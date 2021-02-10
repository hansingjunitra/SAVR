import React, { createRef } from 'react';
import  {View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {generateID} from '../util/util';

import  TransactionCard from '../components/transactionCard';
import { NativeViewGestureHandler, ScrollView, Swipeable } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';

import { TransactionRecordContext } from '../util/context';

const moment = require('moment');

const History = () => {
    var SendIntentAndroid = require("react-native-send-intent");
    const { getTransactionList, addTransaction, deleteTransaction, updateInternalStorage } = React.useContext(TransactionRecordContext);

    let refsList = [];
    let transactionList = getTransactionList();

    const [state, setState] = React.useState([{   
        "id": 3,
        "bank": "Citibank",
        "type": "credit",
        "name": "Citi Cashback",
        "minimum_spending": 800,
        "maximum_rebates": 80,
        "cashbacks": [
            {
                "eligibility": "Dining",
                "percentage": 0.06,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Grocery",
                "percentage": 0.08,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Petrol",
                "percentage": 0.08,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Others" ,
                "percentage": 0.025,
                "cap": null,
                "spent": 0
            }
        ],
        "color": {
            "primary": "#d01714",
            "secondary": "#bdbdc0",
            "tertiary": "#dbdbdb",
            "quartenary": "#8d1107"
        },
        "totalSpent": 0,
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADTSURBVDjLY/j//z8DJZhhGBhw8uTJ/5RgsAF//vwhC7948QJhADkGDTEDtp9c+790ZsL/tD7//4ldXv+X7pmBagA+vOnosv+NqxP/b7ky9f+FZ7v+9+/O+h/er/u/fXHZfwaQKYRwYpfn/42XJ/zfeG3SfxDo2ZP6v39P+n/bfHniEotPteH/bVfm/EcGmy5N/W+eLUmcAZY50t+7dyX9b9+VANbcvjMB7AKgAd+JMgCosCW4R+N/764UsM0gGsQHivcQneaBijuA+BPI2VC6AyQOAPdpPzVHO/APAAAAAElFTkSuQmCC"
    },
    {   
        "id": 4,
        "bank": "OCBC",
        "type": "credit",
        "name": "OCBC Frank",
        "minimum_spending": 600,
        "maximum_rebates": 100,
        "cashbacks": [
            {
                "eligibility": "Online",
                "percentage": 0.06,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Contacless",
                "percentage": 0.06,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Physical Forex Transaction",
                "percentage": 0.06,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Others" ,
                "percentage": 0.003,
                "cap": null,
                "spent": 0
            }
        ],
        "color": {
            "primary": "#d01714",
            "secondary": "#bdbdc0",
            "tertiary": "#dbdbdb",
            "quartenary": "#8d1107"
        },
        "totalSpent": 0,
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADTSURBVDjLY/j//z8DJZhhGBhw8uTJ/5RgsAF//vwhC7948QJhADkGDTEDtp9c+790ZsL/tD7//4ldXv+X7pmBagA+vOnosv+NqxP/b7ky9f+FZ7v+9+/O+h/er/u/fXHZfwaQKYRwYpfn/42XJ/zfeG3SfxDo2ZP6v39P+n/bfHniEotPteH/bVfm/EcGmy5N/W+eLUmcAZY50t+7dyX9b9+VANbcvjMB7AKgAd+JMgCosCW4R+N/764UsM0gGsQHivcQneaBijuA+BPI2VC6AyQOAPdpPzVHO/APAAAAAElFTkSuQmCC"
    },
    {   
        "id": 5,
        "bank": "Maybank",
        "type": "credit",
        "name": "Maybank Family and Friends",
        "minimum_spending": 500,
        "maximum_rebates": 80,
        "cashbacks": [
            {
                "eligibility": "Food Delivery",
                "percentage": 0.05,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Fast Food",
                "percentage": 0.003,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Grocery",
                "percentage": 0.003,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Transport",
                "percentage": 0.003,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Petrol",
                "percentage": 0.003,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Learning/Retail",
                "percentage": 0.003,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Tele/Streaming",
                "percentage": 0.003,
                "cap": null,
                "spent": 0
            },
            {
                "eligibility": "Others" ,
                "percentage": 0.003,
                "cap": null,
                "spent": 0
            }
        ],
        "color": {
            "primary": "#d01714",
            "secondary": "#bdbdc0",
            "tertiary": "#dbdbdb",
            "quartenary": "#8d1107"
        },
        "totalSpent": 0,
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADTSURBVDjLY/j//z8DJZhhGBhw8uTJ/5RgsAF//vwhC7948QJhADkGDTEDtp9c+790ZsL/tD7//4ldXv+X7pmBagA+vOnosv+NqxP/b7ky9f+FZ7v+9+/O+h/er/u/fXHZfwaQKYRwYpfn/42XJ/zfeG3SfxDo2ZP6v39P+n/bfHniEotPteH/bVfm/EcGmy5N/W+eLUmcAZY50t+7dyX9b9+VANbcvjMB7AKgAd+JMgCosCW4R+N/764UsM0gGsQHivcQneaBijuA+BPI2VC6AyQOAPdpPzVHO/APAAAAAElFTkSuQmCC"
    }]);
    
    const setHandler = () => {
        setState((prevState) => [
            ...prevState.slice(0, 1),
            {
                ...prevState[1],
                totalSpent: 12
            },
            ...prevState.slice(2)
        ])
        
        console.log(state)
    }

    return (

        <View style= {{flex:1}}>
            <Text>History Screeh</Text>
            <TouchableOpacity onPress = {() => setHandler()}>
                <Text>Test</Text>
            </TouchableOpacity>
        </View>
    
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    button1: {
        padding: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        margin: 10,
        backgroundColor:'#8f4fbd',
        alignItems: 'center'
    }
})

export default History;