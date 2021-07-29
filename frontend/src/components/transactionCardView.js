import React from 'react';
import {View,
        TouchableOpacity,
        Text} from 'react-native'
import { Icon } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
        
const TransactionCardView = (props) => {
    const { transaction, index, navigation } = props;
    const { dispatch, state } = props;

    return (
        <View key = {index}>
            <Swipeable renderRightActions = {() => (
                    <TouchableOpacity onPress = {() => { dispatch({type: "DELETE_TRANSACTION", data: transaction})}}>
                        <View style = {{width: 50, justifyContent: 'center', alignContent: 'center', flex: 1}}>
                            <Icon  name = 'delete' type= 'materials' style={{justifyContent: 'center', alignContent: 'center'}} size={30}/>
                        </View>
                    </TouchableOpacity>
                        )}>
                <TouchableOpacity onPress = {() => {navigation.navigate("EditTransactionScreen", {transaction:transaction})}}
                        style = {{backgroundColor:'white', margin: 3, marginHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 5,  elevation: 4, borderRadius: 20, height: 70, justifyContent: 'center'}}>
                    <View style = {{flexDirection: 'row',}}>
                        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                            <View>
                                <Icon name = {transaction.icon.name} type = {transaction.icon.type} size={20} color= {'white'} borderRadius= {25} iconStyle = {{padding:10 ,backgroundColor: transaction.icon.color, borderRadius: 20}}/>
                            </View>
                        </View>
                        <View style = {{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                            <View>
                                <Text numberOfLines={1}>{transaction.description}</Text>
                                <Text numberOfLines={1} style ={{color: 'grey'}}>{transaction.category}</Text>
                                <Text numberOfLines={1} style ={{color: 'grey'}}>{transaction.cardName}</Text>
                            </View>
                        </View>
                        <View style = {{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                            <View style = {{flexDirection: 'column'}}>
                                <Text style = {{color: 'red', fontWeight:'bold'}}>${transaction.amount}</Text>
                                <Text>{transaction.date}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </View>
    )
}

export {
    TransactionCardView
}