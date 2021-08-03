import moment from 'moment';
import React, { useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Alert } from 'react-native';
import { View, Text, Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
// import { CardContext } from '../context/context';
import { AppContext } from '../context/context';
import RecommendedCardModal from '../modal/recommendedCardModal';

import { savrAlgo } from './algo';
// var moment = require('moment');

const InputModal = (props) => {
    const {setModal, setModalView, selectedCategory, closeModalHandler, setAmountSpent, amountSpent, setCardList} = props
    const { state, dispatch } = useContext(AppContext);

    const setAmountSpentHandler = (amount) => {
        if (amount != "") {
            setAmountSpent(parseInt(amount))
        } else {
            setAmountSpent(0);
        }
    }

    const optimizeButtonHandler = async () => {
        switch (true) {
            case (amountSpent == 0):
                Alert.alert(
                    "Invalid Amount Spent",
                    "Please key in Amount Spent",
                    [
                        { text: "OK" }
                    ]
                )
                break
            case (selectedCategory == null):
                Alert.alert(
                    "Invalid Category",
                    "Please select a category",
                    [
                        { text: "OK" }
                    ]
                )
                break
            default:
                console.log("Fire API")
                const res = await savrAlgo(amountSpent, selectedCategory, "uid", state.cardList);
                setCardList(JSON.parse(res));
                console.log(res);
                setModalView("SHOW_RECOMMENDED_CARD_MODAL")
        }
    }

    return (
        <View style= {{flex: 1, justifyContent: "flex-end", alignItems: "center", }}>
            <TouchableWithoutFeedback onPress={()=> closeModalHandler()}>
                <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}} />
            </TouchableWithoutFeedback>
            <View style={{width:"100%",  height: "70%", backgroundColor: "white",  borderTopRightRadius: 30,  borderTopLeftRadius: 30, paddingHorizontal: 30, paddingTop: 25, alignItems: "center", shadowColor: "#000", shadowOffset: {width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                <View style= {{marginBottom: 5, alignItems: 'center'}}>
                    <Text style={{fontSize: 24}}>Save with SAVR</Text>
                    <Text style={{textAlign: 'center'}}>Let our AI help you decide which card would give you maximum cashback</Text>
                </View>
                <View style = {{alignItems: 'center', marginVertical: 5}}>
                    <Text style = {{margin: 10}}>How much are you going to spend?</Text>
                    <TextInput placeholder = {'Amount'} style = {{ borderBottomWidth: 2,  borderRadius: 10,  padding: 10, marginHorizontal: 30,  borderColor: '#bdbdbd', borderWidth: 2}} keyboardType = {'numeric'} 
                                onChangeText = {(amount) => setAmountSpentHandler(amount)}
                                value = {amountSpent.toString()}/>
                </View>                
                <View style = {{alignItems: 'center', marginVertical: 10}}>
                    <Text>
                        Date: {moment(new Date()).format("DD/MM/YYYY")}
                    </Text>
                </View>
                {/* <View style = {{alignItems: 'center', marginVertical: 5}}>
                    <Text>Will you make this purchase today?</Text>
                    <View style = {{alignItems: 'center', flexDirection:'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity style = {{paddingHorizontal: 30, marginHorizontal: 10, paddingVertical: 10, marginVertical: 5, borderWidth: 1}}>
                            <View>
                                <Text>Yes</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {{paddingHorizontal: 30, marginHorizontal: 10, paddingVertical: 10, marginVertical: 5, borderWidth: 1}}>
                            <View>
                                <Text>Other Date</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}
                <Text>What are you intending to purchase?</Text>
                <TouchableOpacity placeholder="Select Category" onPress= {() => setModalView("SELECT_CATEGORY_MODAL")} style = {{borderWidth: 2, borderColor: '#d3d3d3', borderRadius:1, padding:10, shadowColor: "#000", width : 200, margin: 10}}>
                    <View>
                        <Text>{selectedCategory === null ? "Select Category" : selectedCategory}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {{paddingHorizontal: 50, paddingVertical: 10, marginVertical: 5, borderWidth: 1}} onPress = {() => optimizeButtonHandler()}>
                    <View>
                        <Text>Optimize</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const CategoryModal = (props) => {
    const {setModal, amountSpent, setSelectedCategory, setModalView, closeModalHandler, setSelectedDescription} = props
    const categoryList = require('../categories.json')
    console.log(amountSpent);
    const [modalCategory, setModalCategory] = React.useState(null);
    const [modalMerchant, setModalMerchant] = React.useState(null);

    const confirmButtonHandler = () => {
        console.log(modalCategory, modalMerchant)
        switch (true){
            case (modalCategory == null && modalMerchant == null):
                Alert.alert(
                    "No Category or Merchant Has Been Selected",
                    "Please Select a Category or Key in a Merchant",
                    [
                        { text: "OK" }
                    ]
                )
                break 
            case modalCategory != null && modalMerchant == null:
                setSelectedCategory(modalCategory.name); 
                setSelectedDescription("NEW UNNAMED DESCRIPTION")
                setModalView("INPUT_MODAL");
                break
            case modalCategory == null && modalMerchant != null:
                if (modalMerchant.toLowerCase() == "giant"){
                    setSelectedCategory("Groceries"); 
                } else if (modalMerchant.toLowerCase() == "sbs") {
                    setSelectedCategory("Travel")
                } else {
                    setSelectedCategory("Others"); 
                }
                setSelectedDescription(modalMerchant)
                setModalView("INPUT_MODAL");
                break
        }
    }

    const inputMerchantHandler = (merchant) => {
        if (merchant == "" ) {
            setModalMerchant(null);
        } else {
            setModalMerchant(merchant);
        }
        setModalCategory(null);
    }

    const selectCategoryHandler = (category) => {
        setModalCategory(category);
        setModalMerchant(null);
    }

    return (
        <KeyboardAvoidingView  keyboardVerticalOffset={0} style = {{flex: 1, flexDirection:'column',  justifyContent: 'center', alignContent: 'center'}} enabled>
            <TouchableWithoutFeedback onPress={()=> closeModalHandler()}>
                <View style={{position: "absolute",top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}} />
            </TouchableWithoutFeedback>
            <View style = {{height: "30%"}}>

            </View>
            {/* <View style = {{"}}> */}
                <View style = {{flex: 1, backgroundColor: "white", justifyContent:'center', height: "70%", backgroundColor: "white", borderTopRightRadius: 30,  borderTopLeftRadius: 30, paddingHorizontal: 30, paddingTop: 25, shadowColor: "#000", shadowOffset: {width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                    <View style={{width:"100%", alignItems: "center", justifyContent: 'center'}}>
                    <ScrollView>
                        <View style= {{marginBottom: 5, alignItems: 'center'}}>
                            <Text style={{fontSize: 24}}>Select Category</Text>
                            <Text style={{textAlign: 'center'}}>Potential Categories Based on your Wallet</Text>
                        </View>
                        <View style ={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: 'white'}}>
                            {categoryList.map((category, index) => {return (
                                <View style = {{alignItems: 'center', width: '33%', height: 80, padding: 5, justifyContent: 'center'}} key = {index}>
                                    <View style = {[{width  : '95%', height: '95%', borderRadius:5, backgroundColor: '#D3D3D3', justifyContent: 'center', alignItems: 'center'}, modalCategory === null ? null : (modalCategory.id === category.id ? {backgroundColor: category.color} : null ) ]}>
                                        <TouchableOpacity onPress = {() => selectCategoryHandler(category)} activeOpacity = {1}>
                                            <Icon name ={category.icon} type={category.type}/>
                                            <Text style ={{fontSize: 11.5}}>{category.name}</Text>                         
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )})}
                        </View>
                        <View style = {{marginVertical: 10}}>
                            <Text>Unsure which category?</Text>
                            <Text>Select a merchant and we will do the rest!</Text>
                            <TextInput placeholder = "Merchant Name"
                            defaultValue={modalMerchant === null ? "" : modalMerchant}
                             onChangeText = {(merchant) => inputMerchantHandler(merchant)}></TextInput>
                        </View>
                        <View style = {{flexDirection: 'row', marginVertical: 5}}>
                            <TouchableOpacity style = {{flex: 1, alignItems: 'center'}} onPress = {() => confirmButtonHandler()}>
                                <Text>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            {/* </View> */}
    
        </KeyboardAvoidingView>
    )
}


export const Recommendation = (props) => {
    const {modal, setModal} = props;
    const [modalView, setModalView] = React.useState("INPUT_MODAL"); 
    const [selectedCategory, setSelectedCategory] = React.useState(null); 
    const [selectedDescription, setSelectedDescription] = React.useState(null); 
    const [amountSpent, setAmountSpent] = React.useState(0);
    const [cardList, setCardList] = React.useState(null);



    const closeModalHandler = () => {
        setModalView("INPUT_MODAL");
        setModal(false);
    }

    const switchModalView = () => {
        switch(modalView) {
            case "INPUT_MODAL": 
                return (
                    <InputModal setModalView = {setModalView} 
                                setModal = {setModal} 
                                selectedCategory = {selectedCategory} 
                                closeModalHandler = {closeModalHandler} 
                                amountSpent={amountSpent} 
                                setCardList = {setCardList}
                                setSelectedDescription = {setSelectedDescription}
                                setAmountSpent={setAmountSpent}/>
                )
            case "SELECT_CATEGORY_MODAL":
                return (
                    <CategoryModal setModalView = {setModalView} 
                                amountSpent = {amountSpent} 
                                setModal = {setModal} 
                                setSelectedCategory = {setSelectedCategory} 
                                setSelectedDescription = {setSelectedDescription}
                                closeModalHandler = {closeModalHandler}/>
                )
            case "SHOW_RECOMMENDED_CARD_MODAL": 
                return (
                    <RecommendedCardModal setModalView = {setModalView}
                                cardList = {cardList}
                                amountSpent = {amountSpent}
                                selectedCategory = {selectedCategory} 
                                selectedDescription = {selectedDescription} 
                                setSelectedCategory = {setSelectedCategory}
                                closeModalHandler = {closeModalHandler}/>
                )
        }
    }
    
    console.log("Launch Recommendation");

    React.useEffect(() => {
        // console.log("Launch Recommendation");
    }, [])

    return (
        <Modal visible = {modal} transparent={true}>
            { switchModalView() }
            {/* <RecommendedCardModal closeModalHandler = {closeModalHandler} cardName = "DBS Live Fresh Card"/> */}
        </Modal>
    )

}
