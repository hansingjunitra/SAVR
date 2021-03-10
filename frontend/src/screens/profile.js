import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, Alert, Button, Image } from 'react-native';

import { CreditCardRecordContext } from '../util/context';
// const getData = () => {
//     return fetch('https://www.saltedge.com/api/v5/transactions?' + new URLSearchParams({
//         connection_id: '429161619457575062',
//         account_id: '429161720020207834',
//     }), {
//         method: 'GET', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//             'App-id': 'IQbFSMetwlJxE3i0KZ7dGwgTHJKHRzNzI2e6UlSIWRM',
//             'Secret': '7R50hNuXcfnU22GJrulgpb9RXcXlXPQb5J6bVt0hvJg'
//         },
//     })
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//     .catch((error) => {
//         console.error(error)
//     })
// }


// const getSaltEdge = async (url = '', data = {}) => {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'GET', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }



var SendIntentAndroid = require("react-native-send-intent");


const Profile = () => {
    
    const [somedata, setData] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)

    const { getCreditCardInformation } = React.useContext(CreditCardRecordContext);
    
    // let [creditCardsInfo, setCCI ] = React.useState; 
    React.useEffect(() => {
        if (isLoading) {
            const getData = async () => {
                fetch("http://localhost:3000/creditcards")
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(err => console.error(err))
            }
            getData().then(setIsLoading(false));
        }
    }, [isLoading]);

    return (
            <View>
                {isLoading ? <Text>Loading</Text> : null } 
                <View>
                    { somedata !== null ? 
                        somedata.map((cards, index) => {return (
                        <View key = {index}>
                            <Text>{cards.name}</Text>
                        </View>
                    )}) : null}
                </View>
            </View>
    )
}

export default Profile;