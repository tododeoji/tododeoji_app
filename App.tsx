import React, { useEffect } from 'react';

import {  SafeAreaProvider  } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import RootStackNavigator from './src/Navigation/RootStack';

interface AppProps {}

function App({}: AppProps) {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <SafeAreaProvider>
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}

export default App;
