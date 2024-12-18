import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface MyPageScreenProps {}

function MyPageScreen({}: MyPageScreenProps) {
  return (
    <SafeAreaView>
      <Text>MyPage Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MyPageScreen;
