import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, StatusBoardScreen, MyPageScreen } from '../Screens';
import Color from '../Components/Common/Color';

import { HomeFill, HomePrimary, StatusBoardFill, StatusBoardPrimary, MyFill, MyPrimary } from '../assets/icons';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? Color.black : Color.gray3,
                fontWeight: focused ? '600' : '400',
                padding: 0,
                margin: 0,
              }}
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
          component={MyPageScreen}
          options={{ tabBarIcon: ({ focused }) => (focused ? <MyFill /> : <MyPrimary />) }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default Navigation;
