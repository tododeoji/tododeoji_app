import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from '../Common';
import Color from '../../Common/Color';
import { TodoItem } from '../../types/todo';
import TodoItemContainer from '../TodoItemContainer';

export default function MainTodoList({ selectedDateTodos }: { selectedDateTodos: TodoItem[] }) {
  return (
    <View style={styles.todoListContainer}>
      {selectedDateTodos.length > 0 ? (
        <FlatList
          style={{ paddingHorizontal: 24, paddingBottom: 30 }}
          data={selectedDateTodos}
          renderItem={({ item }) => <TodoItemContainer todo={item} />}
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
