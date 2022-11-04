/* eslint-disable prettier/prettier */
import React from 'react';
import Home from './Screens/Home/Home';
import Resault from './Screens/Resault/Result';
import Splash from './Screens/Splash/Splash';
import Footer from './Components/Footer';
import NewFooter from './Components/newFooter/NewFooter';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageUploadScreen from './Screens/ImageUpload/ImageUploadScreen';
import ImageUpload from './Screens/ImageScreen/ImageUpload';
import Googlesign from './Screens/Googlesign';
import Camere from './Screens/Camere';
import Add from './Screens/Add';

const App = () => {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Resault" component={Resault} />
        <Stack.Screen name ="Image"  component={ImageUploadScreen}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
