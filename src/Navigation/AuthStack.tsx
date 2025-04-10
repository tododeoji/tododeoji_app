import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthPage, AuthWebView } from '../Screens/Auth';

const Stack = createStackNavigator<{ auth: undefined; authweb: undefined }>();

function AuthStackNavigator() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <GestureHandlerRootView>
        <Stack.Navigator>
          <Stack.Screen name="auth" component={AuthPage} options={{ animation: 'fade', headerShown: false }} />
          <Stack.Screen name="authweb" component={AuthWebView} options={{ animation: 'fade' }} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default AuthStackNavigator;
