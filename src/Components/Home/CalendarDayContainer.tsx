import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from '../Common/Text';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { useExpandedStore, useSelectedDateStore } from '../../stores/home';
import { formatDate } from '../../lib/formatDate';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface CalendarDayContainerProps {
  dayInfo: { date: Date; disabled: boolean };
  dayCount: number;
  TodoDataList: any;
}

function CalendarDayContainer({ dayInfo, dayCount, TodoDataList }: CalendarDayContainerProps) {
  console.log(dayCount);
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { isExpanded, setIsExpanded } = useExpandedStore();
  const [showItemCount, setShowItemCount] = useState(5);

  const animationProgress = useSharedValue(isExpanded ? 1 : 0);

  const animatedItemStyle = useAnimatedStyle(() => {
    const height = interpolate(animationProgress.value, [0, 1], [1, 10]);

    return {
      height,
      opacity: interpolate(animationProgress.value, [0, 0.5, 1], [1, 0, 1]),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: animationProgress.value,
    };
  });

  useEffect(() => {
    setShowItemCount(isExpanded ? 5 : 4);
    animationProgress.value = withTiming(isExpanded ? 1 : 0, { duration: 300 });
  }, [isExpanded]);

  const dateString = formatDate(dayInfo.date);
  const todos = TodoDataList[dateString]?.todos || [];

  const isToday = new Date().toDateString() === dayInfo.date.toDateString();
  const isSelected = selectedDate === dateString;

  const handleDayPress = () => {
    console.log('Selected date:', dateString);
    setSelectedDate(dateString);
    setIsExpanded(false);
  };

  return (
    <Pressable
      style={[
        styles.dayContainer,
        isExpanded ? { height: dayCount > 35 ? '25.72%' : '29.48%' } : { height: dayCount > 35 ? '25.4%' : '28.88%' },
      ]}
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
                    <Text fontFamily={FontFamily.SEMIBOLD} fontStyle={FontStyle.caption3} numberOfLines={1}>
                      {todo.title}
                    </Text>
                  )}
                </Animated.View>
              </Animated.View>
            ),
        )}
        {todos.length > showItemCount && (
          <View style={{ width: '95%', paddingHorizontal: 2 }}>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption3} style={{ textAlign: 'right' }}>
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
    width: '95%',
    padding: 1,
    paddingLeft: 4,
    borderRadius: 2,
    marginBottom: 2,
    overflow: 'hidden',
  },
});
