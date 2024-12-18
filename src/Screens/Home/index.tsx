import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface HomeScreenProps {}

function HomeScreen({}: HomeScreenProps) {
  return (
    <SafeAreaView>
      <Text>홈화면</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default HomeScreen;
