import React from 'react'
import { View } from 'react-native'
import { BannerAd, TestIds, BannerAdSize } from '@react-native-admob/admob';
  

const Add = () => {
  return (
    <View style={{flex:1}}>
          <BannerAd style={{alignSelf:"center", position:"absolute",bottom:5}}
          size={BannerAdSize.BANNER}
          unitId={TestIds.BANNER}
          onAdFailedToLoad={(error) => console.error(error)}/>
    </View>
  )
}

export default Add