import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../Components/Common';

interface ProgressTabScreenProps {}

function ProgressTabScreen({}: ProgressTabScreenProps) {
  return (
    <View style={styles.container}>
      <Text>진행중</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ProgressTabScreen;
