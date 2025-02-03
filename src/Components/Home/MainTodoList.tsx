import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text, TouchableSVG } from '../Common';
import { FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { DoneIcon, KebobIcon, ProgressIcon, TodoIcon } from '../../assets/icons';
import { TodoItem } from '../../types/todo';

export default function MainTodoList({ selectedDateTodos }: { selectedDateTodos: TodoItem[] }) {
  const StateIcon = ({ state, color = Color.black }: { state: string; color?: string }) => {
    switch (state) {
      case 'todo':
        return <TodoIcon fill={color} />;
      case 'progress':
        return <ProgressIcon fill={color} />;
      case 'done':
        return <DoneIcon fill={color} />;
    }
  };

  return (
    <View style={styles.todoListContainer}>
      {selectedDateTodos.length > 0 ? (
        <FlatList
          style={{ paddingHorizontal: 24, paddingBottom: 30 }}
          data={selectedDateTodos}
          renderItem={({ item: todo }) => {
            return (
              <View key={todo.id} style={[styles.todoItem]}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'center',
                    backgroundColor: todo.color,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRadius: 20,
                  }}
                >
                  <StateIcon state={todo.state} />
                  <Text>{todo.category}</Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={[
                    { flex: 1 },
                    todo.state === 'done' && { color: Color.gray3, textDecorationLine: 'line-through' },
                  ]}
                >
                  {todo.title}
                </Text>
                <Text fontStyle={FontStyle.caption1} color={Color.gray3}>
                  {'18:00'}
                </Text>
                <TouchableSVG SVG={KebobIcon} />
              </View>
            );
          }}
        />
      ) : (
        <Text>오늘 할 일이 없어요.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    paddingTop: 8,
  },
  todoItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
    backgroundColor: Color.white,
    borderWidth: 0.5,
    borderColor: Color.gray2,
  },
});
