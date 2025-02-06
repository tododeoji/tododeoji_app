import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainTodoList from '../../Components/Home/MainTodoList';
import { useTodayListStore } from '../../stores/home';

interface DoneTabScreenProps {}

function DoneTabScreen({}: DoneTabScreenProps) {
  const { doneList } = useTodayListStore();

  return (
    <View style={styles.container}>
      <MainTodoList selectedDateTodos={doneList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default DoneTabScreen;
