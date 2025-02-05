import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const TodoTab = () => <View style={{ backgroundColor: 'red' }} />;
const ProgressTab = () => <View />;
const DoneTab = () => <View />;

function StatusBoardTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="todo" component={TodoTab} />
      <Tab.Screen name="progress" component={ProgressTab} />
      <Tab.Screen name="done" component={DoneTab} />
    </Tab.Navigator>
  );
}

export default StatusBoardTab;
