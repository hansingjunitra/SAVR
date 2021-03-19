import React from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, Image } from 'react-native';

import { CardContext } from '../context';

export const TestScreen = () => {
    const {getCardList} = React.useContext(CardContext);
    console.log(getCardList());

    return (
        <View>
            <Text>Test Test</Text>
        </View>
    )
}