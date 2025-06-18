import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from '../Common/Text';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { useExpandedStore, useSelectedDateStore } from '../../stores/home';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import dayjs from 'dayjs';

interface CalendarDayContainerProps {
  dayInfo: { date: dayjs.Dayjs; disabled: boolean };
  dayCount: number;
  TodoDataList: any;
}

function CalendarDayContainer({ dayInfo, dayCount, TodoDataList }: CalendarDayContainerProps) {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { isExpanded, setIsExpanded, toggleExpanded } = useExpandedStore();
  const [showItemCount, setShowItemCount] = useState(6);

  const animationProgress = useSharedValue(isExpanded ? 1 : 0);

  const animatedItemStyle = useAnimatedStyle(
    () => ({
      height: interpolate(animationProgress.value, [0, 1], [4, 22]),
      opacity: interpolate(animationProgress.value, [0, 0.5, 1], [1, 1, 1]),
    }),
    [],
  );

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: animationProgress.value,
    };
  });

  useEffect(() => {
    setShowItemCount(isExpanded ? 6 : 4);
    animationProgress.value = withTiming(isExpanded ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    });
  }, [isExpanded]);
  const todos = TodoDataList[dayjs(dayInfo.date).format('YYYY-MM-DD')]?.todos || [];

  const isToday = dayjs().format('YY-MM-DD') === dayjs(dayInfo.date).format('YY-MM-DD');
  const isSelected = selectedDate === dayjs(dayInfo.date).format('YYYY-MM-DD');

  const handleDayPress = () => {
    dayjs(dayInfo.date).format('YYYY-MM-DD') === selectedDate ? toggleExpanded() : setIsExpanded(false);
    setSelectedDate(dayjs(dayInfo.date).format('YYYY-MM-DD'));
  };

  return (
    <Pressable
      style={[styles.dayContainer, isExpanded ? { minHeight: dayCount > 35 ? 104.3 : 125.1 } : { height: 63 }]}
      onPress={handleDayPress}
    >
      <View
        style={[
          styles.dayTextContainer,
          isToday && { backgroundColor: Color.gray1 },
          isSelected && { backgroundColor: Color.yellow, borderRadius: 12 },
        ]}
      >
        <Text style={{ color: dayInfo.disabled ? '#ccc' : '#000', textAlign: 'center' }}>
          {dayjs(dayInfo.date).format('D')}
        </Text>
      </View>
      <>
        {todos.map(
          (todo: { color: any; title: string }, index: number) =>
            index < showItemCount && (
              <Animated.View key={index} style={[styles.todoItem, { backgroundColor: todo.color }, animatedItemStyle]}>
                <Animated.View style={animatedTextStyle}>
                  {isExpanded && (
                    <Text fontFamily={FontFamily.SEMIBOLD} style={{ fontSize: 11, letterSpacing: -0.2 }}>
                      {todo.title}
                    </Text>
                  )}
                </Animated.View>
              </Animated.View>
            ),
        )}
        {todos.length > showItemCount && (
          <View style={{ width: '95%', paddingHorizontal: 2 }}>
            <Text
              fontFamily={FontFamily.BOLD}
              fontStyle={FontStyle.caption2}
              style={{ textAlign: 'right', lineHeight: 12 }}
            >
              +{todos.length - showItemCount}
            </Text>
          </View>
        )}
      </>
    </Pressable>
  );
}

export default CalendarDayContainer;

const styles = StyleSheet.create({
  dayContainer: {
    width: '14.28%',
    padding: 2,
    paddingTop: 4,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dayTextContainer: {
    width: 30,
    height: 23,
    borderRadius: 12,
    marginBottom: 2,
  },
  todoItem: {
    width: '100%',
    paddingLeft: 4,
    paddingRight: 0.1,
    overflow: 'hidden',
    borderRadius: 2,
    marginBottom: 2,
  },
});
