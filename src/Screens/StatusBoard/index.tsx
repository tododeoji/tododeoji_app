import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
