import React, { useContext } from 'react';
import { View, 
        Text, 
        StyleSheet, 
        FlatList, 
        TouchableOpacity, 
        Modal,
         TouchableWithoutFeedback } from 'react-native';

import {AppContext} from '../context/context';
import {EditTransaction} from './editTransaction';
import {AddTransaction} from './addTransaction';
import { Icon } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';
import { SelectCardModal } from '../modal/addTransactionSelectCardModal';

import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { SafeAreaView } from 'react-native';
import { set } from 'react-native-reanimated';
import { TransactionCardView } from '../components/transactionCardView';
// import Modal from 'react-native-modal';

export const ExpenseTracker = ({route, navigation}) => {
    console.log('Render ExpenseTracker.js');
    const ref = React.useRef(null);
    const { state, dispatch } = useContext(AppContext);

    return (
        <SafeAreaView>
          <View style = {{height: "100%"}}>
            <FlatList 
                data = {state.transactionList.sort((a, b) => b.date === a.date ?  new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date))} 
                keyExtractor={(item ,index)=> index.toString()}
                contentContainerStyle={{paddingBottom:60, paddingVertical: 15}} 
                renderItem = {({item, index}) => {
                    return ( 
                    <TransactionCardView transaction = {item} index = {index} navigation = {navigation} key = {index}/>
                    )}}>
            </FlatList>
            <TouchableOpacity
              activeOpacity={.7}
              style={{                
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              position: 'absolute',
              bottom: 20,
              right: 20,
              height: 60,
              backgroundColor: '#01a699',
              borderRadius: 100,
              }}
              onPress = {() => ref.current.setModalVisibility(true)} 
            >
            <Icon name='add' type = {'material'} size={25} height={25} color='#fff' />
            </TouchableOpacity>
          </View>
          <SelectCardModal ref = {ref} navigation = {navigation} />
        </SafeAreaView>
    )
}


const style = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  