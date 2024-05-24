import React from 'react';
import {LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import SessionProvider from './context/SessionProvider';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  return (
    <SessionProvider>
    <NavigationContainer>
      <AppNavigation/>
    </NavigationContainer>
    </SessionProvider>
  );
};

export default App;
