import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Shadow } from 'react-native-shadow-2';

import { H, Text } from '../Common';
import Color from '../../Common/Color';
import { TodoItem } from '../../types/todo';
import TodoItemContainer from '../TodoItemContainer';
import { DuzyIcon, FloatingAddIcon } from '../../assets/icons';

export default function MainTodoList({ selectedDateTodos }: { selectedDateTodos: TodoItem[] }) {
  return (
    <View style={styles.todoListContainer}>
      {selectedDateTodos.length > 0 ? (
        <FlatList
          style={{ paddingHorizontal: 24, paddingBottom: 30 }}
          data={selectedDateTodos}
          renderItem={({ item }) => <TodoItemContainer todo={item} />}
          ListHeaderComponent={() => <H h={16} />}
          ListFooterComponent={() => <H h={55} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <DuzyIcon width={80} height={78.27} />
          <Text color={Color.gray3}>할 일이 없어요.</Text>
        </View>
      )}
      <Pressable
        style={{
          position: 'absolute',
          bottom: 16,
          right: 24,
          borderRadius: 25,
          width: 45,
          height: 45,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        onPress={() => console.log('press Floating Button')}
      >
        <Shadow
          distance={10}
          offset={[0, 10]}
          startColor={'#C8C8C8'}
          style={{ borderRadius: 25, width: 30, height: 30 }}
        />
        <FloatingAddIcon width={50} height={50} style={{ position: 'absolute', top: 0, right: -3, zIndex: 100 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: Color.gray1,
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
  emptyContainer: {
    alignItems: 'center',
    padding: '10%',
  },
});
