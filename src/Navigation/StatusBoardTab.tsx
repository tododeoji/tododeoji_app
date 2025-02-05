import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import Color from '../Common/Color';
import { FontFamily } from '../Common/Font';
import { DoneTabScreen, ProgressTabScreen, TodoTabScreen } from '../Screens/StatusBoard';

const Tab = createMaterialTopTabNavigator();

function StatusBoardTab() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Color.black,
          tabBarInactiveTintColor: Color.gray2,
          tabBarIndicatorStyle: {
            backgroundColor: Color.yellow,
            height: 2,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: FontFamily.BOLD,
            textAlignVertical: 'center',
            padding: 0,
            margin: 0,
          },
          tabBarStyle: {
            height: 44,
          },
        }}
      >
        <Tab.Screen name="todo" component={TodoTabScreen} options={{ tabBarLabel: '할 일' }} />
        <Tab.Screen name="progress" component={ProgressTabScreen} options={{ tabBarLabel: '진행중' }} />
        <Tab.Screen name="done" component={DoneTabScreen} options={{ tabBarLabel: '완료' }} />
      </Tab.Navigator>
    </View>
  );
}

export default StatusBoardTab;
