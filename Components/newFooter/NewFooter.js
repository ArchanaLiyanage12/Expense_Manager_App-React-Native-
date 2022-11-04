// /* eslint-disable prettier/prettier */
// import React from "react";
// import {
//   Text,
//   StyleSheet,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   BackHandler,
//   SafeAreaView,
// } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// // import {MaterialCommunityIcons} from '@expo/vector-icons';
// import Home from "../../Screens/Home/Home";
// import Resault from "../../Screens/Resault/Result";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Tab = createMaterialBottomTabNavigator();

// const NewFooter =()=> {
//   return (
//     <Tab.Navigator
//       initialRouteName="home"
//       activeColor="#e91e63"
//       labelStyle={{fontSize: 12}}
//       style={{backgroundColor: 'tomato'}}>
//       <Tab.Screen
//         name="home"
//         component={Home}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({color}) => (
//             <MaterialCommunityIcons name="home" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Result"
//         component={Resault}
//         options={{
//           tabBarLabel: 'Result',
//           tabBarIcon: ({color}) => (
//             <MaterialCommunityIcons name="Result" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Home}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({color}) => (
//             <MaterialCommunityIcons name="account" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default NewFooter;
