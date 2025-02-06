import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainTodoList from '../../Components/Home/MainTodoList';
import { useTodayListStore } from '../../stores/home';

interface ProgressTabScreenProps {}

function ProgressTabScreen({}: ProgressTabScreenProps) {
  const { progressList } = useTodayListStore();

  return (
    <View style={styles.container}>
      <MainTodoList selectedDateTodos={progressList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ProgressTabScreen;
