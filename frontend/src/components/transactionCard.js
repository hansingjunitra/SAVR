import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const TransactionCard = (props) => {
    return (
        <View style = {{ flexDirection: 'row',
                        backgroundColor:'white', margin: 3, shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 3 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 5,  
                                            elevation: 5,
                                            borderRadius: 20, height: 50}}>
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                <View>
                    <Icon name = {props.transaction.category.icon}
                            type= {props.transaction.category.type}
                            color= 'white'
                            backgroundColor= {props.transaction.category.color}
                            borderRadius= {30}
                            style = {{width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}
                            size = {15}
                    />
                </View>
            </View>
            <View style = {{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                <View>
                    <Text>{props.transaction.merchant}</Text>
                    <Text style ={{color: 'grey'}}>{props.transaction.category.name}</Text>
                </View>
            </View>
            <View style = {{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                <View style = {{flexDirection: 'column'}}>
                    <Text style = {{color: 'red', fontWeight:'bold'}}>{props.transaction.amount.currency.symbol}{props.transaction.amount.value}</Text>
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