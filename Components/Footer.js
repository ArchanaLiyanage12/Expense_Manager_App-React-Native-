/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function Footer({screenName1, screenName2}) {
  const navigation = useNavigation();
  return (
    <View style={style.foterContainer}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate(screenName2)}>
          <Icon name="home" size={27} color={'#FFFFFF'} />
          {/* <IconFont name="home" size={25} color={'#FFFFFF'} /> */}
          <Text style={{color: '#FFFFFF', marginLeft: -2.9, marginTop: -3.5}}>
            home
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate(screenName1)}>
          {/* <Icon name="text-height" size={25} color={'#FFFFFF'} /> */}
          <IconFont name="file-text-o" size={22} color={'#FFFFFF'} />
          <Text style={{color: '#FFFFFF', marginLeft: -10, marginTop: 1.5}}>
            Results
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          {/* <Icon name="text" size={25} color={'#FFFFFF'} /> */}
          <FontAwesome5 name="user-alt" size={22} color={'#FFFFFF'} />
          <Text style={{color: '#FFFFFF', marginLeft: -7, marginTop: 1}}>
            profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  foterContainer: {
    backgroundColor: '#3291a8',
    borderRadius: 9,
    height: '85%',
    padding: 8,
    // width: '97%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '1.5%',
  },
});

export default Footer;
