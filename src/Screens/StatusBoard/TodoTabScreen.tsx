import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainTodoList from '../../Components/Home/MainTodoList';
import { useTodayListStore } from '../../stores/home';

interface TodoTabScreenProps {}

function TodoTabScreen({}: TodoTabScreenProps) {
  const { todoList } = useTodayListStore();

  return (
    <View style={styles.container}>
      <MainTodoList selectedDateTodos={todoList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default TodoTabScreen;
