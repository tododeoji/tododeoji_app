import React from 'react';

import Navigation from './src/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from './src/Navigation/Stack/Root';

interface AppProps {}

function App({}: AppProps) {
  return (
    <SafeAreaProvider>
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}

export default App;
