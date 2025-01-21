import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { HomeScreen, StatusBoardScreen } from '../Screens';
import Color from '../Common/Color';
import { FontFamily, FontStyle } from '../Common/Font';
import { NavigationHeader, Text, TouchableSVG } from '../Components/Common';

import { MyPageStackScreen } from './Stack/Mypage';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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

const Tab = createBottomTabNavigator();

function Navigation() {
  const insets = useSafeAreaInsets();

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
                <NavigationHeader
                  insets={insets}
                  HeaderTitle="1월"
                  RightComponent={
                    <View style={styles.homeHeader}>
                      <TouchableSVG SVG={NavigateLeft} fill={Color.white} />
                      <View>
                        <Text>오늘</Text>
                      </View>
                      <TouchableSVG SVG={NavigateRight} fill={Color.white} />
                    </View>
                  }
                />
              ),
            }}
          />
          <Tab.Screen
            name="상태보드"
            component={StatusBoardScreen}
            options={{
              tabBarIcon: ({ focused }) => (focused ? <StatusBoardFill /> : <StatusBoardPrimary />),
              header: () => <NavigationHeader insets={insets} HeaderTitle="상태보드" />,
            }}
          />
          <Tab.Screen
            name="마이"
            component={MyPageStackScreen}
            options={{
              tabBarIcon: ({ focused }) => (focused ? <MyFill /> : <MyPrimary />),
              header: () => (
                <NavigationHeader
                  insets={insets}
                  HeaderTitle="마이 페이지"
                  RightComponent={<TouchableSVG SVG={Settings} size={20} fill="white" />}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
});

export default Navigation;
