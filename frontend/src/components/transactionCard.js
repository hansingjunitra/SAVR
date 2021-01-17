import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const TransactionCard = (props) => {

    return (
        <View style = {{ flexDirection: 'row',
        backgroundColor:'white', marginHorizontal: 10, marginVertical: 10, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,  
                            elevation: 5,
                            borderRadius: 20,
                            paddingVertical: 10,
                            paddingHorizontal: 10}}>
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                {/* <View> */}
                    <Icon name='cart'
                            type='material-community'
                            color='white'
                            backgroundColor= '#dbb4ed'
                            borderRadius= {25}
                            style = {{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}
                    />
                {/* </View> */}
            </View>
            <View style = {{flex: 3, flexDirection: 'row'}}>
                <View>
                    <Text>{props.transaction.name}</Text>
                    <Text style ={{color: 'grey'}}>{props.transaction.card}</Text>
                </View>
            </View>
            <View style = {{flex: 1, flexDirection: 'row'}}>
                <View style = {{flexDirection: 'column'}}>
                    <Text>$ {props.transaction.amount}</Text>
                    <Text>{props.transaction.date}</Text>
                </View>
            </View>
        </View>
    )
}

export default TransactionCard;

            {/* <View style = {{backgroundColor:'white', marginHorizontal: 10, marginVertical: 15, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,  
                            elevation: 5}}>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <View>
                        <Text>
                            Test
                        </Text>
                        <Icon name='cart'
                            type='material-community'
                            color='white'
                            backgroundColor= '#dbb4ed'
                            borderRadius = {40}
                            style = {{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}
                            />
                    </View>
                </View>
                <View style = {{flex: 3, flexDirection: 'row'}}>
                    <View>
                        <Text>{props.transaction.name}</Text>
                        <Text>{props.transaction.tag}</Text>
                    </View>
                </View>
                {/* <Text>{props.transaction.date}</Text> */}
                {/* <View style = {{flex: 2, flexDirection: 'row'}}>
                    <View>
                        <Text>{props.transaction.price}</Text>
                    </View>
                </View>
            </View> */} 