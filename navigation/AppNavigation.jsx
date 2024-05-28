import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../components/Home';
import License from '../components/License';
import { useSession } from '../context/SessionProvider';
import PatientInfo from '../components/PatientInfo';
import VisionChartResults from '../components/VisionChartResults';
import Pdf from '../components/Pdf';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    const { category, setCategory, entries, setEntries } = useSession();

    useEffect(() => {
        get();
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
        
    }

    if (!category) {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="License" component={License} />
            </Stack.Navigator>
        );
    } else {
        return (
            <Stack.Navigator initialRouteName="VisionChartResults">
                <Stack.Screen name="PatientInfo" component={PatientInfo} />
                <Stack.Screen name="VisionChartResults" component={VisionChartResults} />
                <Stack.Screen name="Pdf" component={Pdf} />
            </Stack.Navigator>
        );
    }
};

export default AppNavigation;
