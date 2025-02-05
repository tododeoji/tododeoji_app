import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../Components/Common';

interface DoneTabScreenProps {}

function DoneTabScreen({}: DoneTabScreenProps) {
  return (
    <View style={styles.container}>
      <Text>완료</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default DoneTabScreen;
