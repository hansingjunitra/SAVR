import React from 'react';
import {View, Image, Dimensions} from 'react-native';

const SAVR = require('./assets/splashscreen.jpg');
export const SplashScreen = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <View>
            <Image source={SAVR} style = {{height: '100%', width: '100%'}}></Image>
        </View>
    )
}