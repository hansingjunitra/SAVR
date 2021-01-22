import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import CardStats from '../components/cardStats';

const CardGoals = ({navigation}) => {

  const [cardInfoList, setCardInfoList] = React.useState([
    {card: 'dbs_live_fresh_card', limit: '400/600', cashback: '50', categories: 'dining, petrol'}
  ])

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{height: 100}}>
        <Text>WIP</Text>
      </View>
      <ScrollView>
        {cardInfoList.map((cardInfo, index) => {
          return <CardStats key = {index} cardInfo = {cardInfo}/>
        })}
      </ScrollView>
    </View>
  )
}

export default CardGoals;