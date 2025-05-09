import React, { useRef } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Text } from '@/Components/Common';
import { FontStyle } from '@/Common/Font';
import Color from '@/Common/Color';
import { DoneIcon, ProgressIcon, TodoIcon } from '@/assets/icons';
import { TodoItem } from '@/types/todo';
import { useDeleteTodoModalStore } from '@/stores/home';

interface TodoItemProps {
  todo: TodoItem;
}

function TodoItemContainer({ todo }: TodoItemProps) {
  const { openDeleteTodoModal, setDeleteItem } = useDeleteTodoModalStore();
  const swipeableRef = useRef(null);

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

  const DeleteButton = () => {
    return (
      <Pressable
        style={styles.deleteButton}
        onPress={() => {
          (swipeableRef.current as any).close();
          setDeleteItem(todo);
          openDeleteTodoModal();
        }}
      >
        <Text style={styles.deleteButtonText}>삭제</Text>
      </Pressable>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={DeleteButton}
      overshootRight={false}
      rightThreshold={80}
      friction={2}
    >
      <Pressable style={[styles.todoItem]} onPress={() => console.log('press')}>
        <View
          style={{
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            backgroundColor: todo.color,
            paddingVertical: 2,
            paddingHorizontal: 8,
            borderRadius: 20,
          }}
        >
          <StateIcon state={todo.state} />
          <Text>{todo.category}</Text>
        </View>
        <Text
          numberOfLines={1}
          style={[{ flex: 1 }, todo.state === 'done' && { color: Color.gray3, textDecorationLine: 'line-through' }]}
        >
          {todo.title}
        </Text>
        <Text fontStyle={FontStyle.caption1} color={Color.gray3}>
          {'18:00'}
        </Text>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    height: 42,
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
  deleteButton: {
    backgroundColor: Color.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 42,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default TodoItemContainer;
