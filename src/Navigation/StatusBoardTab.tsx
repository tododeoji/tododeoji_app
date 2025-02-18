import React, { useCallback, useEffect, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import Color from '../Common/Color';
import { FontFamily, FontStyle } from '../Common/Font';
import { DoneTabScreen, ProgressTabScreen, TodoTabScreen } from '../Screens/StatusBoard';
import { useBottomSheetStore, useTodayListStore } from '../stores/home';
import { Text } from '../Components/Common';
import UpdateTodoSheet from '../Components/Modal/UpdateTodoSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function StatusBoardTab() {
  const { todoList, progressList, doneList } = useTodayListStore();
  const categorySheetRef = useRef<BottomSheetModal>(null);
  const { setRef, closeCategorySheet } = useBottomSheetStore();

  useEffect(() => {
    setRef(categorySheetRef);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setRef(categorySheetRef);
    }, []),
  );

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
    <>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: Color.yellow,
              height: 2,
              width: '25.33%',
              marginHorizontal: '3.7%',
            },
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
      <UpdateTodoSheet
        ref={categorySheetRef}
        onCloseSheet={() => closeCategorySheet(categorySheetRef)}
        insetsBottom={0}
      />
    </>
  );
}

export default StatusBoardTab;
