import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import CardStats from '../components/cardStats';

const CardGoals = ({navigation}) => {

  const [cardInfoList, setCardInfoList] = React.useState([
    {card: 'dbs_live_fresh_card', limit: '600', categories: 'dining, petrol'},
    {card: 'ocbc_365', limit: '400', categories: 'groceries'},
    {card: 'uob_visa', limit: '0', categories: 'general'}
  ])

  return(
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flex: 1, backgroundColor: 'mintcream', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Cards overview</Text>
        <Text style={{textAlign: 'center'}}>
          WIP{'\n'}
          What should i put here lol
        </Text>
        <Text>Current monthly savings: $100</Text>
      </View>
      <View style={{flex: 4}}>
        <ScrollView>
          <Text>Cards owned</Text>
          {cardInfoList.map((cardInfo, index) => {
            return <CardStats key = {index} cardInfo = {cardInfo}/>
          })}
        </ScrollView>
        </View>
    </View>
  )
}

export default CardGoals;