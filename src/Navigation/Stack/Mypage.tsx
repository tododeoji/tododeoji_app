import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { MyPageScreen } from '../../Screens';

const Stack = createStackNavigator();

export function MyPageStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="mypage" component={MyPageScreen} options={{ headerTitle: '마이 페이지' }} />
    </Stack.Navigator>
  );
}
