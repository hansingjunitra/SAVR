import React,  { forwardRef, useState, useImperativeHandle, useContext,  } from 'react';
import { View, 
         Modal, 
         TouchableWithoutFeedback, 
         Text, 
         ScrollView, 
         StyleSheet, } from 'react-native';
import { SelectCardWalletView } from '../components/selectCardWalletView';
import { AppContext } from '../context/context';

const WalletCardModal = forwardRef((props, ref) => {
    const [ modalVisibility, setModalVisibility ] = useState(false);
    const { setSwiperHandler } = props;
    const { state, dispatch } = useContext(AppContext);
    useImperativeHandle(ref, () => {
        return {
            setModalVisibility: setModalVisibility,
        }
    })   
    
    const selectCardHandler = (index) => {
        setModalVisibility(false); 
        setSwiperHandler(index + 1);
    }
    
    return (
        <Modal animationType="none" transparent={true} visible={modalVisibility} onRequestClose={() => { Alert.alert("Modal has been closed.");   setModalVisibility(!modalVisibility); }}>
            <View style= {style.modalContainer}>
                <TouchableWithoutFeedback onPress={()=> setModalVisibility(false)}>
                    <View style={style.background} />
                </TouchableWithoutFeedback>
                <View style={style.mainContainer}>
                    <View style = {style.titleText}>
                        <Text style = {{fontSize: 28}}>Your Wallet</Text>
                    </View>
                    <ScrollView>
                        <View style = {style.cardContainer}>
                            {state.cardList.map((card, index) => <SelectCardWalletView card = {card} selectCardHandler = {selectCardHandler} index = {index} key = {index}/>)}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
})

const style = StyleSheet.create({
    modalContainer: {
        flex: 1, 
        justifyContent: "flex-end", 
        alignItems: "center", 
    },
    background: {
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    mainContainer: {
        width:"100%" , 
        height: "70%", 
        backgroundColor: "white",  
        borderTopRightRadius: 30, 
        borderTopLeftRadius: 30, 
        paddingHorizontal: 25, 
        paddingTop: 25, 
        alignItems: "center", 
        shadowColor: "#000", 
        shadowOffset: {width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5
    },
    titleText: {
        alignItems: 'center', 
        marginBottom: 20
    },
    cardContainer: { 
        alignContent: 'stretch',  
        flex: 1, 
        flexWrap: "wrap",
        flexDirection: "row"
    }
})

export {
    WalletCardModal
}