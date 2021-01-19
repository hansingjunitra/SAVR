import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight, Alert, TextInput, Image } from 'react-native';

const getData = () => {
    return fetch('http://localhost:3000')
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => {
        console.error(error)
    })
}

const Profile = () => {

    return (
        <View>
            <Text>Profile Screen</Text>
                <TouchableOpacity style = {{backgroundColor: 'cyan', height: 100}} onPress = {() => {getData()}}>
                    <Text>Test</Text>
                </TouchableOpacity>
        </View>
    )
}

export default Profile;