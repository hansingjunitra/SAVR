import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react';
import { View,
        Button,
        Modal,
        Image,
        Text,
        TouchableWithoutFeedback,
        TouchableOpacity,
        StyleSheet } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { AppContext } from '../context/context';

const RecommendedCardModal = (props) => {
    // amountSpent = {amountSpent}
    //                             setNewTransction = {setNewTransction} 
    //                             setSelectedCategory = {setSelectedCategory}
    const { cardList, closeModalHandler, amountSpent, selectedCategory, selectedDescription } = props;
    const { state, dispatch } = useContext(AppContext);

    const [ index, setIndex ] = useState(0);
    const [ card, setCard ] = useState(state.cardList.find((c) => c.card_name == cardList[index]));
    
    // useEffect(() => {
    //     if (cardList !== null && cardList.length != 0) {
    //         setCard(state.cardList.find((c) => c.card_name == cardList[index]));
    //     }
    // }, [cardList])

    // console.log(cardList[0])
    // const card = state.cardList.find((c) => c.card_name == cardList[0] )
    // console.log("DEBUG>>>", card)

    const addTransactionHandler = () => {
        // console.log(amountSpent, selectedCategory, selectedDescription, cardList, card)

        // const card = state.cardList.find((c) => c.id == cardList[index])
        const today = new Date()
        
        let category = card.categories.find((c) => c.eligibility === selectedCategory) 
        category = category === undefined ?  card.categories.find((c) => c.eligibility === "Others")  : category

        const newTransaction = {
            alias: null, 
            amount: amountSpent, 
            cardID: card.id, 
            cardName: card.card_name, 
            category: category.eligibility, 
            date: moment().format("YYYY-MM-DD"), 
            description: selectedDescription, 
            icon: category.icon, 
            id: Math.floor(Math.random() * 1000000000000), 
            merchant: null
        }

        let updatedTotalSpent = card.totalSpent;
        let updatedSpendingBreakdown = card.spendingBreakdown;

        updatedTotalSpent += newTransaction.amount;
        updatedSpendingBreakdown[`${newTransaction.category}`] += newTransaction.amount

        let updatedCard = {
            ...card,
            totalSpent: updatedTotalSpent,
            spendingBreakdown: updatedSpendingBreakdown
        }

        dispatch({type: "ADD_TRANSACTION", data: newTransaction});
        dispatch({type: "UPDATE_CARD", data: updatedCard});

        closeModalHandler();
    }

    const getProgress = (totalSpent, minmumSpending) => {
        if (!(minmumSpending == null || minmumSpending == 0)) {
            let value = totalSpent / minmumSpending
            if (value < 1) {
                return value;
            }
        }
        return 1;
    }

    const nextCardHandler = () => {
        setIndex((index + 1) % cardList.length)
        // console.log(state.cardList.find((c) => c.card_name == cardList[(((index + 1) % cardList.length) + cardList.length)% cardList.length ]).card_name)
        setCard(state.cardList.find((c) => c.card_name == cardList[(((index + 1) % cardList.length) + cardList.length)% cardList.length ]))
    }

    const getRebate = () => {

        let category = card.categories.find((c) => c.eligibility === selectedCategory) 
        category = category === undefined ?  card.categories.find((c) => c.eligibility === "Others")  : category
        // console.log(category)

        return amountSpent * category.percentage
    }

    // const progress = 

    return (
        <View style= {{flex: 1, justifyContent: "flex-end", alignItems: "center", }}>
            <TouchableWithoutFeedback onPress={()=> closeModalHandler()}>
                <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}} />
            </TouchableWithoutFeedback>
            <View style={{width:"100%",  height: "70%", backgroundColor: "white",  borderTopRightRadius: 30,  borderTopLeftRadius: 30, paddingHorizontal: 30, paddingTop: 25, alignItems: "center", shadowColor: "#000", shadowOffset: {width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                <View style= {{marginBottom: 5, alignItems: 'center'}}>
                    <Text style={{fontSize: 24}}>Recommended Card</Text>
                </View>
            { card === undefined ?             
                <View style = {{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                    <Text>We could not recommend you any card! Please try again!</Text>
                </View>
                :
                <View style = {{flex: 1, marginVertical: 20, alignContent: 'center'}}>
                    <Text style = {{textAlign: "center", padding: 10, fontSize: 20, fontWeight: 'bold'}}>{card.card_name}</Text>
                    <Image source = {{uri: card.image}} style = {style.cardImage}/>
                    <View style = {style.progressBarContainer}>
                        <ProgressBar progress={getProgress(card.totalSpent + amountSpent, card.minimum_spending)} color={card.color.quartenary} style = {style.progressBar}/>
                        <Text style = {style.progressBarText}>${(card.totalSpent + amountSpent).toFixed(2) } / ${card.minimum_spending}</Text>
                    </View>
                    <Text style = {{textAlign: "center", padding: 10, fontSize: 14}}>Cashback from this transaction $ {getRebate()} </Text>
                    <View style = {{flexDirection: 'row', alignContent: 'space-between'}}>
                        <TouchableOpacity onPress = {addTransactionHandler} style = {{flex: 1}}>
                            <View style= {{alignSelf: 'center', width: 100, height: 40, borderRadius: 10, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 10, borderColor: '#01a699'}}>
                                <Text style = {{textAlign: 'center', color: "#01a699"}}>Add Transaction</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {nextCardHandler} style = {{flex: 1}}>
                            <View style= {{alignSelf: 'center', width: 100, height: 40, borderRadius: 10, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 10, borderColor: '#01a699'}}>
                                <Text style = {{textAlign: 'center', color: "#01a699"}}>Alternative</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    cardImage: {
        height: 168, 
        width: 280, 
        borderRadius: 10,
        marginVertical: 10,
    },
    progressBar: {
        height: '100%', 
        borderRadius: 10
    },
    progressBarText: {
        position:'absolute', 
        right: 10, 
        top: 15
    },
    progressBarContainer: {
        height: 50, 
        width: 280, 
        borderRadius: 10,
        marginVertical: 15,
        alignContent: 'center'
    },
})

export default RecommendedCardModal;