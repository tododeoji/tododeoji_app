import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from '../Common/Text';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { useExpandedStore, useSelectedDateStore } from '../../stores/home';
import { formatDate } from '../../lib/formatDate';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface CalendarDayContainerProps {
  dayInfo: { date: Date; disabled: boolean };
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
      duration: 200,
      easing: Easing.linear,
    });
  }, [isExpanded]);

  const dateString = formatDate(dayInfo.date);
  const todos = TodoDataList[dateString]?.todos || [];

  const isToday = new Date().toDateString() === dayInfo.date.toDateString();
  const isSelected = selectedDate === dateString;

  const handleDayPress = () => {
    console.log('Selected date:', dateString);
    dateString === selectedDate ? toggleExpanded() : setIsExpanded(false);
    setSelectedDate(dateString);
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
          isSelected && { backgroundColor: Color.yellow },
        ]}
      >
        <Text style={{ color: dayInfo.disabled ? '#ccc' : '#000', textAlign: 'center' }}>{dayInfo.date.getDate()}</Text>
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
