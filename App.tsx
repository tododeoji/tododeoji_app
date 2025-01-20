import React from 'react';

import Navigation from './src/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface AppProps {}

function App({}: AppProps) {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
