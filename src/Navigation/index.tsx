import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen, StatusBoardScreen } from '../Screens';
import Color from '../Common/Color';
import { FontFamily, FontStyle } from '../Common/Font';
import { Text, TouchableSVG } from '../Components/Common';

import {
  HomeFill,
  HomePrimary,
  StatusBoardFill,
  StatusBoardPrimary,
  MyFill,
  MyPrimary,
  Settings,
  NavigateLeft,
  NavigateRight,
} from '../assets/icons';
import { MyPageStackScreen } from './Stack/Mypage';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text
                fontFamily={FontFamily.BOLD}
                fontStyle={FontStyle.caption2}
                color={focused ? Color.black : Color.gray3}
              >
                {route.name}
              </Text>
            ),
          })}
        >
          <Tab.Screen
            name="홈"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (focused ? <HomeFill /> : <HomePrimary />),
              header: () => (
                <SafeAreaView style={styles.container}>
                  <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.title2}>
                    {'1'}월
                  </Text>
                  <View style={styles.homeHeader}>
                    <TouchableSVG SVG={NavigateLeft} fill={Color.white} />
                    <View>
                      <Text>오늘</Text>
                    </View>
                    <TouchableSVG SVG={NavigateRight} fill={Color.white} />
                  </View>
                </SafeAreaView>
              ),
            }}
          />
          <Tab.Screen
            name="상태보드"
            component={StatusBoardScreen}
            options={{
              tabBarIcon: ({ focused }) => (focused ? <StatusBoardFill /> : <StatusBoardPrimary />),
              header: () => (
                <SafeAreaView style={styles.container}>
                  <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.title2}>
                    상태 보드
                  </Text>
                </SafeAreaView>
              ),
            }}
          />
          <Tab.Screen
            name="마이"
            component={MyPageStackScreen}
            options={{
              tabBarIcon: ({ focused }) => (focused ? <MyFill /> : <MyPrimary />),
              header: () => (
                <SafeAreaView style={styles.container}>
                  <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.title2}>
                    마이 페이지
                  </Text>
                  <TouchableSVG SVG={Settings} size={20} fill="white" />
                </SafeAreaView>
              ),
            }}
          />
        </Tab.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  homeHeader: {
    flexDirection: 'row',
    gap: 2,
  },
});

export default Navigation;
