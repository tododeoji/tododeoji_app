import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../Components/Common';

interface StatusBoardScreenProps {}

function StatusBoardScreen({}: StatusBoardScreenProps) {
  return (
    <SafeAreaView>
      <Text>StateBoard</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default StatusBoardScreen;
