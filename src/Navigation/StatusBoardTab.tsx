import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import Color from '../Common/Color';
import { FontFamily, FontStyle } from '../Common/Font';
import { DoneTabScreen, ProgressTabScreen, TodoTabScreen } from '../Screens/StatusBoard';
import { useTodayListStore } from '../stores/home';
import { Text } from '../Components/Common';

const Tab = createMaterialTopTabNavigator();

function StatusBoardTab() {
  const { todoList, progressList, doneList } = useTodayListStore();

  const CustomTabLabel = ({
    title,
    listLength,
    isFocused,
  }: {
    title: string;
    listLength: number;
    isFocused: boolean;
  }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        <Text
          fontFamily={FontFamily.BOLD}
          fontStyle={FontStyle.description1}
          style={{ color: isFocused ? Color.black : Color.gray2 }}
        >
          {title}
        </Text>
        <Text
          fontFamily={FontFamily.BOLD}
          fontStyle={FontStyle.description2}
          style={{ color: isFocused ? Color.black : Color.gray2 }}
        >
          {listLength}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: Color.yellow, height: 2, width: '25.33%', marginHorizontal: '3.7%' },
          tabBarStyle: { height: 44 },
        }}
      >
        <Tab.Screen
          name="todo"
          component={TodoTabScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabLabel title="할 일" listLength={todoList.length} isFocused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="progress"
          component={ProgressTabScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabLabel title="진행중" listLength={progressList.length} isFocused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="done"
          component={DoneTabScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabLabel title="완료" listLength={doneList.length} isFocused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default StatusBoardTab;
