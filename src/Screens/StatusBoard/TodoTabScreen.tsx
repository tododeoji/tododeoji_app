import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../Components/Common';

interface TodoTabScreenProps {}

function TodoTabScreen({}: TodoTabScreenProps) {
  return (
    <View style={styles.container}>
      <Text>할 일</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default TodoTabScreen;
