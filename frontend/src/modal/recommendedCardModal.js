import React, { useContext } from 'react';
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
    const { cardName, closeModalHandler } = props;
    const { state } = useContext(AppContext);
    const card = state.cardList.find((c) => c.card_name == cardName )

    const getProgress = (totalSpent, minmumSpending) => {
        if (!(minmumSpending == null || minmumSpending == 0)) {
            let value = totalSpent / minmumSpending
            if (value < 1) {
                return value;
            }
        }
        return 1;
    }

    const progress = getProgress(card.totalSpent, card.minimum_spending)

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
                        <ProgressBar progress={progress} color={card.color.quartenary} style = {style.progressBar}/>
                        <Text style = {style.progressBarText}>${card.totalSpent.toFixed(2)} / ${card.minimum_spending}</Text>
                    </View>
                    <Text style = {{textAlign: "center", padding: 10, fontSize: 14}}>Cashback from this transaction $2.71</Text>
                    <View style = {{flexDirection: 'row', alignContent: 'space-between'}}>
                        <TouchableOpacity onPress = {() => null} style = {{flex: 1}}>
                            <View style= {{alignSelf: 'center', width: 80, height: 40, borderRadius: 10, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 10, borderColor: '#01a699'}}>
                                <Text style = {{textAlign: 'center', color: "#01a699"}}>Confirm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => null} style = {{flex: 1}}>
                            <View style= {{alignSelf: 'center', width: 80, height: 40, borderRadius: 10, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 10, borderColor: '#01a699'}}>
                                <Text style = {{textAlign: 'center', color: "#01a699"}}>Confirm</Text>
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
        height: 150, 
        width: 250, 
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
        width: 250, 
        borderRadius: 10,
        marginVertical: 15,
        alignContent: 'center'
    },
})

export default RecommendedCardModal;