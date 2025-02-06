import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigation from './MainTab';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MyPage from '../Screens/MyPage';
import { RootStackParamList } from '../types/navigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
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
              name="main"
              component={MainTabNavigation}
              options={{ animation: 'fade', headerShown: false }}
            />

            <Stack.Screen name="editProfile" component={MyPage.EditProfileScreen} />
            <Stack.Screen name="category" component={MyPage.CategoryScreen} />
            <Stack.Screen name="setting" component={MyPage.SettingScreen} />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
