import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { Text } from '../Components/Common';

const Stack = createStackNavigator<{ auth: undefined }>();

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
        <BottomSheetModalProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="auth"
              component={() => (
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 24,
                    position: 'relative',
                  }}
                >
                  <Text>Auth Screen</Text>
                </View>
              )}
              options={{ animation: 'fade', headerShown: false }}
            />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default AuthStackNavigator;
