import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen, StatusBoardScreen } from '../Screens';
import Color from '../Common/Color';
import { Text } from '../Components/Common';

import { HomeFill, HomePrimary, StatusBoardFill, StatusBoardPrimary, MyFill, MyPrimary } from '../assets/icons';
import { MyPageStackScreen } from './Stack/Mypage';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused }) => (
            <Text
              fontSize={10}
              lineHeight={17}
              fontWeight={focused ? 'bold' : '400'}
              color={focused ? Color.black : Color.gray3}
            >
              {route.name}
            </Text>
          ),
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="홈"
          component={HomeScreen}
          options={{ tabBarIcon: ({ focused }) => (focused ? <HomeFill /> : <HomePrimary />) }}
        />
        <Tab.Screen
          name="상태보드"
          component={StatusBoardScreen}
          options={{ tabBarIcon: ({ focused }) => (focused ? <StatusBoardFill /> : <StatusBoardPrimary />) }}
        />
        <Tab.Screen
          name="마이"
          component={MyPageStackScreen}
          options={{ tabBarIcon: ({ focused }) => (focused ? <MyFill /> : <MyPrimary />), headerTitle: '마이페이지' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
