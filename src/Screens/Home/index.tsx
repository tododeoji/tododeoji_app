import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, ViewStyle, DimensionValue } from 'react-native';
import { Gesture, GestureDetector, GestureType, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import CalendarDayContainer from '../../Components/Home/CalendarDayContainer';
import MainTodoList from '../../Components/Home/MainTodoList';

import Color from '../../Common/Color';
import { FontStyle } from '../../Common/Font';
import { NavigateLeft, NavigateRight } from '../../assets/icons';
import { useExpandedStore, useSelectedDateStore } from '../../stores/home';
import { formatDate } from '../../lib/formatDate';
import { TodoItem } from '../../types/todo';
import { fadeIn, fadeOut } from '../../lib/viewAnimation';

interface TodosByDate {
  [key: string]: {
    todos: TodoItem[];
  };
}

const HomeScreen = ({ navigation }: any) => {
  const changeMonthFadeAnim = useSharedValue(1);

  const insets = useSafeAreaInsets();
  const newDate = new Date();

  const scrollViewRef = useRef<ScrollView>(null);
  const swipeGestureRef = useRef<GestureType | undefined>();
  const panGestureRef = useRef<PanGestureHandler | null>(null);

  const [currentMonth, setCurrentMonth] = useState(newDate);
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { isExpanded, setIsExpanded } = useExpandedStore();
  const TodoDataList: TodosByDate = {
    '2025-02-01': {
      todos: [
        { id: 1, state: 'done', category: '공부', title: '영어 공부', color: '#FFE5E5' },
        { id: 2, state: 'todo', category: '공부', title: '송별회', color: '#FF4747' },
        { id: 3, state: 'progress', category: '공부', title: '세탁기 돌리기', color: '#FF8026' },
        { id: 4, state: 'todo', category: '공부', title: '과제 제출', color: '#FFC119' },
        { id: 5, state: 'done', category: '공부', title: '카공', color: '#00D0F9' },
        { id: 6, state: 'done', category: '공부', title: '코테 준비', color: '#8A4BFF' },
        { id: 7, state: 'todo', category: '공부', title: '운동하기', color: '#FBE3A2' },
        { id: 8, state: 'todo', category: '공부', title: '운동하기', color: '#FBE3A2' },
        {
          id: 9,
          state: 'todo',
          category: '공부',
          title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
          color: '#FBE3A2',
        },
      ],
    },
    '2025-02-02': {
      todos: [
        { id: 1, state: 'todo', category: '공부', title: '영어 공부', color: '#FBE3A2' },
        { id: 2, state: 'done', category: '공부', title: '운동하기', color: '#FF9090' },
      ],
    },
    '2025-02-03': {
      todos: [
        { id: 1, state: 'done', category: '공부', title: '영어 공부', color: '#FFAED4' },
        { id: 2, state: 'todo', category: '공부', title: '운동하기', color: '#A7E793' },
      ],
    },
    '2025-02-27': {
      todos: [{ id: 3, state: 'todo', category: '공부', title: '프로젝트 회의', color: '#CCCCCC' }],
    },
    '2025-02-26': {
      todos: [
        { id: 1, state: 'done', category: '공부', title: '영어 공부', color: '#FFE5E5' },
        { id: 2, state: 'todo', category: '공부', title: '송별회', color: '#FF4747' },
        { id: 3, state: 'progress', category: '공부', title: '세탁기 돌리기', color: '#FF8026' },
        { id: 4, state: 'todo', category: '공부', title: '과제 제출', color: '#FFC119' },
        { id: 5, state: 'done', category: '공부', title: '카공', color: '#00D0F9' },
        { id: 6, state: 'done', category: '공부', title: '코테 준비', color: '#8A4BFF' },
      ],
    },
    '2025-03-30': {
      todos: [
        { id: 1, state: 'done', category: '공부', title: '영어 공부', color: '#FFE5E5' },
        { id: 2, state: 'todo', category: '공부', title: '송별회', color: '#FF4747' },
        { id: 3, state: 'progress', category: '공부', title: '세탁기 돌리기', color: '#FF8026' },
        { id: 4, state: 'todo', category: '공부', title: '과제 제출', color: '#FFC119' },
        { id: 5, state: 'done', category: '공부', title: '카공', color: '#00D0F9' },
        { id: 6, state: 'done', category: '공부', title: '코테 준비', color: '#8A4BFF' },
      ],
    },
  };

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
    setSelectedDate(formatDate(currentMonth));
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const firstDayOfWeek = firstDay.getDay();
    const lastDayOfWeek = lastDay.getDay();

    // 이전 달의 날짜들
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({
        date: prevDate,
        disabled: true,
      });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        disabled: false,
      });
    }

    // 다음 달의 날짜들
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      const nextDate = new Date(year, month + 1, i);
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
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1);
    setCurrentMonth(date);
    setTimeout(() => {
      fadeIn(changeMonthFadeAnim);
    }, 100);
  };

  const setNextMonth = () => {
    fadeOut(changeMonthFadeAnim);
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);
    setCurrentMonth(date);
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
          HeaderTitle={`${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`}
          RightComponent={
            <View style={styles.homeHeader}>
              <TouchableSVG SVG={NavigateLeft} onPress={setLastMonth} fill={Color.white} />
              <Pressable
                style={{ backgroundColor: Color.yellow, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 }}
                onPress={() => {
                  currentMonth.getMonth() !== newDate.getMonth() && fadeOut(changeMonthFadeAnim);
                  setCurrentMonth(newDate);
                  setSelectedDate(formatDate(newDate));
                  currentMonth.getMonth() !== newDate.getMonth() &&
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
