import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, ViewStyle, DimensionValue } from 'react-native';
import { Gesture, GestureDetector, GestureType, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import dayjs from 'dayjs';

import { NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import CalendarDayContainer from '../../Components/Home/CalendarDayContainer';
import MainTodoList from '../../Components/Home/MainTodoList';

import Color from '../../Common/Color';
import { FontStyle } from '../../Common/Font';
import { NavigateLeft, NavigateRight } from '../../assets/icons';
import { useBottomSheetStore, useExpandedStore, useSelectedDateStore, useTodayListStore } from '../../stores/home';
import { fadeIn, fadeOut } from '../../lib/viewAnimation';
import { TodoDataList } from '../../data/mockTodoList';
import DeleteTodoModal from '../../Components/Modal/DeleteTodoModal';
import UpdateTodoSheet from '../../Components/Modal/UpdateTodoSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {
  const categorySheetRef = useRef<BottomSheetModal>(null);
  const { setRef, closeCategorySheet } = useBottomSheetStore();

  const { setTodoList, setProgressList, setDoneList } = useTodayListStore();
  const changeMonthFadeAnim = useSharedValue(1);

  const insets = useSafeAreaInsets();
  const newDate = dayjs();

  const scrollViewRef = useRef<ScrollView>(null);
  const swipeGestureRef = useRef<GestureType | undefined>();
  const panGestureRef = useRef<PanGestureHandler | null>(null);

  const [currentMonth, setCurrentMonth] = useState(newDate);
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { isExpanded, setIsExpanded } = useExpandedStore();

  const calendarHeight = useSharedValue<string | number>('100%');
  const animatedStyles = useAnimatedStyle<ViewStyle>(() => {
    return {
      height: calendarHeight.value as unknown as DimensionValue,
    };
  });

  useEffect(() => {
    isExpanded
      ? (calendarHeight.value = withTiming('100%', { duration: 300 }))
      : (calendarHeight.value = withTiming('45%', { duration: 300 }));
  }, [isExpanded]);

  useEffect(() => {
    setRef(categorySheetRef);
    setSelectedDate(currentMonth.format('YYYY-MM-DD'));
    setTodoList(TodoDataList['2025-02-01']?.todos.filter((data) => data.state === 'todo') || []);
    setProgressList(TodoDataList['2025-02-01']?.todos.filter((data) => data.state === 'progress') || []);
    setDoneList(TodoDataList['2025-02-01']?.todos.filter((data) => data.state === 'done') || []);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setRef(categorySheetRef);
    }, []),
  );

  const getDaysInMonth = (date: dayjs.Dayjs) => {
    const year = date.year();
    const month = date.month();
    const firstDay = dayjs(new Date(year, month, 1));
    const lastDay = dayjs(new Date(year, month + 1, 0));

    const days = [];
    const firstDayOfWeek = firstDay.day();
    const lastDayOfWeek = lastDay.day();

    // 이전 달의 날짜들
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = firstDay.subtract(i + 1, 'day');
      days.unshift({
        date: prevDate,
        disabled: true,
      });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= lastDay.date(); i++) {
      days.push({
        date: dayjs(new Date(year, month, i)),
        disabled: false,
      });
    }

    // 다음 달의 날짜들
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      const nextDate = lastDay.add(i, 'day');
      days.push({
        date: nextDate,
        disabled: true,
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const setLastMonth = () => {
    fadeOut(changeMonthFadeAnim);
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setTimeout(() => {
      fadeIn(changeMonthFadeAnim);
    }, 100);
  };

  const setNextMonth = () => {
    fadeOut(changeMonthFadeAnim);
    setCurrentMonth(currentMonth.add(1, 'month'));
    setTimeout(() => {
      fadeIn(changeMonthFadeAnim);
    }, 100);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: changeMonthFadeAnim.value,
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          insets={insets}
          HeaderTitle={`${currentMonth.year()}년 ${currentMonth.month() + 1}월`}
          RightComponent={
            <View style={styles.homeHeader}>
              <TouchableSVG SVG={NavigateLeft} onPress={setLastMonth} fill={Color.white} />
              <Pressable
                style={{ backgroundColor: Color.yellow, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 }}
                onPress={() => {
                  currentMonth.month() !== newDate.month() && fadeOut(changeMonthFadeAnim);
                  setCurrentMonth(newDate);
                  setSelectedDate(newDate.format('YYYY-MM-DD'));
                  currentMonth.month() !== newDate.month() &&
                    setTimeout(() => {
                      fadeIn(changeMonthFadeAnim);
                    }, 100);
                }}
              >
                <Text>오늘</Text>
              </Pressable>
              <TouchableSVG SVG={NavigateRight} fill={Color.white} onPress={setNextMonth} />
            </View>
          }
        />
      ),
    });
  });

  const selectedDateTodos = TodoDataList[selectedDate]?.todos || [];

  const swipeGesture = Gesture.Pan()
    .withRef(swipeGestureRef)
    .minDistance(10)
    .activeOffsetX([-20, 20])
    .onBegin((e) => {
      if (Math.abs(e.translationX) > Math.abs(e.translationY)) {
        scrollViewRef?.current?.scrollTo({ x: 0, y: 0 });
      }
    })
    .onEnd((e) => {
      'worklet';
      e.translationX < -50 && runOnJS(setNextMonth)();
      e.translationX > 50 && runOnJS(setLastMonth)();
      e.translationY > 100 && !isExpanded && runOnJS(setIsExpanded)(true);
    });

  return (
    <>
      <Animated.View style={[styles.calendar, { minHeight: days.length > 35 ? 410 : 345 }, animatedStyles]}>
        <GestureDetector gesture={Gesture.Race(swipeGesture)}>
          <View style={{ flex: 1 }}>
            <View style={styles.weekHeader}>
              {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <Text
                  fontStyle={FontStyle.caption1}
                  key={index}
                  style={[styles.weekDayText, index === 0 && { color: Color.red }]}
                >
                  {day}
                </Text>
              ))}
            </View>
            <Animated.View style={[animatedStyle]}>
              <ScrollView
                style={{ height: '97%' }}
                ref={scrollViewRef}
                scrollEnabled={isExpanded}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                directionalLockEnabled
                simultaneousHandlers={[panGestureRef]}
              >
                <View style={styles.daysContainerContent}>
                  {days.map((day, index) => (
                    <CalendarDayContainer
                      key={index}
                      dayInfo={day}
                      dayCount={days.length}
                      TodoDataList={TodoDataList}
                    />
                  ))}
                </View>
              </ScrollView>
            </Animated.View>
          </View>
        </GestureDetector>
      </Animated.View>
      {!isExpanded && <MainTodoList selectedDateTodos={selectedDateTodos} />}

      <DeleteTodoModal />
      <UpdateTodoSheet
        ref={categorySheetRef}
        onCloseSheet={() => closeCategorySheet(categorySheetRef)}
        insetsBottom={insets.bottom}
      />
    </>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  calendar: {
    paddingHorizontal: 24,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 22,
    paddingHorizontal: 2,
  },
  weekDayText: {
    width: 44,
    textAlign: 'center',
  },
  daysContainer: {
    width: '100%',
  },
  daysContainerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 8,
  },
});

export default HomeScreen;
