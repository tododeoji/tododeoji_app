import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from './src/Navigation/RootStack';

interface AppProps {}

function App({}: AppProps) {
  return (
    <SafeAreaProvider>
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}

export default App;
