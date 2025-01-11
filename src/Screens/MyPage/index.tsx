import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../Components/Common';

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
