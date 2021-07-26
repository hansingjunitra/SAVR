import React from 'react';
import { View, Image, StyleSheet } from 'react-native'; 

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0, // space from bottombar
        height: 75,
        width: 75,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 75,
        height: 75,
        borderWidth: 2, 
        borderRadius: 75,
        borderColor: '#efefef'
    }
})

const SAVRRecommendationButton = () => {
    return (
        <View style= {style.container}>
            <Image 
                source= {require('../assets/recommendationlogo-01-01.png')}
                style = {style.image}/>
        </View>
    )
}


export { SAVRRecommendationButton }