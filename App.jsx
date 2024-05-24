import React from 'react';
import {LogBox, View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
LogBox.ignoreLogs(['new NativeEventEmitter']);

import Home from './components/Home';
import License from './components/License';
import PatientInfo from './components/PatientInfo';
import VisionChartResults from './components/VisionChartResults';

const Stack = createNativeStackNavigator();

const App = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VisionChartResults">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="License" component={License} />
        <Stack.Screen name="PatientInfo" component={PatientInfo} />
        <Stack.Screen name="VisionChartResults" component={VisionChartResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
