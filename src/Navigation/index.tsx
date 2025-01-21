import React from 'react';

import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';

import { HomeScreen, MyPageScreen, StatusBoardScreen } from '../Screens';
import Color from '../Common/Color';
import { FontFamily, FontStyle } from '../Common/Font';
import { NavigationHeader, Text, TouchableSVG } from '../Components/Common';

import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  HomeFill,
  HomePrimary,
  StatusBoardFill,
  StatusBoardPrimary,
  MyFill,
  MyPrimary,
  NavigateLeft,
  NavigateRight,
  Settings,
} from '../assets/icons';
import { RootStackParamList, TabParamList } from '../types/navigator';
import { StackNavigationProp } from '@react-navigation/stack';

type CombinedNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  StackNavigationProp<RootStackParamList>
>;
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabNavigation() {
  const navigation = useNavigation<CombinedNavProp>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        detachInactiveScreens: false,
        tabBarLabel: ({ focused }) => (
          <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption2} color={focused ? Color.black : Color.gray3}>
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
        component={MyPageScreen}
        options={{
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) => (focused ? <MyFill /> : <MyPrimary />),
          header: () => (
            <NavigationHeader
              insets={insets}
              HeaderTitle="마이 페이지"
              RightComponent={
                <TouchableSVG
                  onPress={() => {
                    navigation.navigate('setting');
                  }}
                  SVG={Settings}
                  size={20}
                  fill="white"
                />
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
});

export default MainTabNavigation;
