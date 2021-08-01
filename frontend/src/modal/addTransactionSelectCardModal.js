import React, {forwardRef, useContext, useState, useImperativeHandle  } from 'react';
import { View,
        Modal,
        TouchableWithoutFeedback,
        Text,
        ScrollView,
        Image,
        TouchableOpacity
     } from 'react-native';
import { AppContext } from '../context/context';

const SelectCardModal = React.forwardRef(({props, navigation}, ref) => {
    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null)

    // const {navigation} = props;

    const { state, dispatch } = useContext(AppContext);
    useImperativeHandle(ref, () => {
        return {
            setModalVisibility: setModalVisibility,
            modalVisibility: modalVisibility
        }
    })

    return (
        <Modal animationType="none" transparent={true} visible={modalVisibility} onRequestClose={() => { Alert.alert("Modal has been closed.");   setModalVisibility(!modalVisibility); }}>
            <View style= {{flex: 1, justifyContent: "flex-end", alignItems: "center", }}>
                <TouchableWithoutFeedback onPress={()=> setModalVisibility(false)}>
                    <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}} />
                </TouchableWithoutFeedback>
                <View style={{width:"100%" , height: "70%", backgroundColor: "white",  borderTopRightRadius: 30,  borderTopLeftRadius: 30, paddingHorizontal: 25, paddingTop: 25, alignItems: "center", shadowColor: "#000", shadowOffset: {width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                    <View style = {{alignItems: 'center', marginBottom: 20}}>
                        <Text style = {{fontSize: 28}}>Select Card</Text>
                        <Text>Which card did you use for spending?</Text>
                    </View>
                    <ScrollView>
                        <View style = {{ alignContent: 'stretch',  flex: 1, flexWrap: "wrap",flexDirection: "row"} }>
                            {state.cardList.map((card, index) => {
                                return (
                                    <View style = {{width : '50%', padding: 5, height: 100}} key = {index}>
                                        <TouchableOpacity style = {[(selectedCard !== null) && (selectedCard.id === card.id) ? {borderWidth: 3, borderColor: card.color.quartenary, backgroundColor: card.colorCode, borderRadius: 15} : null]} onPress = {() => setSelectedCard(card)}>
                                        {/* <TouchableOpacity> */}
                                            <Image style = {{height: '100%', width: '100%', borderRadius: 10}} source = {{uri: card.image}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style = {{height: '15%', justifyContent: 'center', width: '40%'}}>
                        <TouchableOpacity style = {{margin:5, padding: 10, backgroundColor: '#2196F3', borderRadius: 10, alignItems: 'center'}} onPress = {() => {setModalVisibility(false); navigation.navigate('AddTransactionScreen', {selectedCard:selectedCard})}}>
                                <Text style = {{color: 'white'}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export {
    SelectCardModal
}