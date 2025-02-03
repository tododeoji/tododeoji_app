import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from '../Common/Text';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { useExpandedStore, useSelectedDateStore } from '../../stores/home';
import { formatDate } from '../../lib/formatDate';

interface CalendarDayContainerProps {
  dayInfo: { date: Date; disabled: boolean };
  TodoDataList: any;
}

function CalendarDayContainer({ dayInfo, TodoDataList }: CalendarDayContainerProps) {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { isExpanded, setIsExpanded } = useExpandedStore();

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
    <Pressable style={[styles.dayContainer, { height: isExpanded ? '29.44%' : '28.88%' }]} onPress={handleDayPress}>
      <View
        style={[
          styles.dayTextContainer,
          isToday && { backgroundColor: Color.gray1 },
          isSelected && { backgroundColor: Color.yellow },
        ]}
      >
        <Text style={{ color: dayInfo.disabled ? '#ccc' : '#000', textAlign: 'center' }}>{dayInfo.date.getDate()}</Text>
      </View>
      {isExpanded ? (
        <>
          {todos.map(
            (todo: { color: any; title: string }, index: number) =>
              index < 6 && (
                <View key={index} style={[styles.todoItem, { backgroundColor: todo.color }]}>
                  <Text fontFamily={FontFamily.SEMIBOLD} fontStyle={FontStyle.caption3} numberOfLines={1}>
                    {todo.title}
                  </Text>
                </View>
              ),
          )}
          {todos.length > 6 && (
            <View style={{ width: '95%', paddingHorizontal: 2 }}>
              <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption3} style={{ textAlign: 'right' }}>
                +{todos.length - 6}
              </Text>
            </View>
          )}
        </>
      ) : (
        <>
          {todos.map(
            (todo: { color: any; title: string }, index: number) =>
              index < 4 && (
                <View
                  key={index}
                  style={{ backgroundColor: todo.color, height: 2.5, width: '95%', borderRadius: 2, marginBottom: 1 }}
                />
              ),
          )}
          {todos.length > 4 && (
            <View style={{ width: '95%', paddingHorizontal: 2 }}>
              <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption3} style={{ textAlign: 'right' }}>
                +{todos.length - 4}
              </Text>
            </View>
          )}
        </>
      )}
    </Pressable>
  );
}

export default CalendarDayContainer;

const styles = StyleSheet.create({
  dayContainer: {
    padding: 2,
    paddingTop: 6,
    alignItems: 'center',
  },
  dayTextContainer: {
    width: 30,
    height: 23,
    borderRadius: 12,
    marginBottom: 2,
  },
  todoItem: {
    width: '95%',
    padding: 2,
    paddingLeft: 4,
    borderRadius: 2,
    marginBottom: 2,
  },
});
