import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProgressBar, Colors } from 'react-native-paper';
import { Icon } from 'react-native-elements';

const CardCard = (props) => {

    return (
        <View style ={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 15}}>
            <TouchableOpacity activeOpacity = {1} style = {{borderRadius: 15}}>
                <Image source = {{uri: props.card.image}} style={{height: 150, width: 250, borderRadius: 15}}></Image>
            </TouchableOpacity>
            {/* <Text style = {{color: 'white', fontSize: 48}}>{props.card.bank}</Text> */}
        </View>
    )
}

export default CardCard;

{/* <View style={{height: 150, width: 250, borderRadius: 15}}>
                        <ImageBackground source = {{uri: props.card.image}} imageStyle={{ borderRadius: 15}} style={{height: 150, width: 250}} blurRadius = {3}>
                            
                            <View style = {{margin: 10, padding: 5,  backgroundColor : 'white', height: 50, borderRadius: 10}}>
                                <View style = {{marginBottom: 5}}>
                                    <Text style = {{fontSize:8, marginLeft: 10}}>Contacless</Text>
                                </View>
                            
                                <View style = {{flexDirection: 'row'}}>
                                    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <Icon size={20} name = {'contactless-payment'} type = {'material-community'}></Icon>
                                    </View>
                                    <View style = {{flex: 4, flexDirection: 'column'}}>
                                        <View style = {{flex: 1, justifyContent: 'center'}}>
                                            <Text style = {{fontSize: 9}}> 100</Text>                                        
                                        </View>
                                        <View style = {{flex: 1, justifyContent: 'center'}}>
                                            <ProgressBar progress={0.5} color = {'#00FFFF'} style = {{borderRadius:20}}></ProgressBar>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View> */}