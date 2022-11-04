/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, Image, View, StyleSheet, ImageBackground } from 'react-native';

const Splash = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate('Home');
    },2000);
    return(
        <View>
            <ImageBackground style={{width:"100%", height:"100%"}} source={require('../../Components/Images/background1.png')}>
            <Image style={style.logo} source={require('../../Components/Images/logo1.png')}></Image>
            <Text style={style.head}>College ExpTracker</Text>
            </ImageBackground>
        </View>
    )
}

const style = StyleSheet.create({
    head: {
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '10%',
        color: '#ffffff',
      },
      logo: {
        width: '22%',
        height: '10%',
        alignSelf: 'center',
        marginTop: '60%',
    },
})

export default Splash