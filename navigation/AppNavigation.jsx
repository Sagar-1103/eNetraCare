import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../components/Home';
import License from '../components/License';
import {useSession} from '../context/SessionProvider';
import PatientInfo from '../components/PatientInfo';
import VisionChartResults from '../components/VisionChartResults';
import Pdf from '../components/Pdf';
import LogoScreen from '../components/LogoScreen';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const [loading,setLoading] = useState(true);
  const {category, setCategory, entries, setEntries} = useSession();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      get();
    }, 2000);
  }, []);

  const get = async () => {
    const tempCategory = await AsyncStorage.getItem('category');
    const tempEntries = await AsyncStorage.getItem('entries');
    if (tempCategory !== null) {
      setCategory(JSON.parse(tempCategory));
    }
    if (tempEntries !== null) {
      setEntries(JSON.parse(tempEntries));
    }
    setLoading(false);
  };
  if(loading){
    return (
      <LogoScreen/>
    )
  }

  if (!category) {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="License" component={License} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="VisionChartResults" screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen options={{ title: 'Patient Form' }} name="PatientInfo" component={PatientInfo} />
        <Stack.Screen
        options={{ title: 'Eye Section' }}
          name="VisionChartResults"
          component={VisionChartResults}
        />
        <Stack.Screen
        options={{ title: 'Patient Document Management'}} name="Pdf" component={Pdf} />
      </Stack.Navigator>
    );
  }
};

export default AppNavigation;
