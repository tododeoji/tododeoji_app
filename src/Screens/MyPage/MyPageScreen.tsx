import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { H, Text } from '../../Components/Common';
import Color from '../../Common/Color';
import ProFile from '../../Components/MyPage/ProFile';
import { BoxIcon } from '../../assets/icons';

interface MyPageScreenProps {
  navigation: any;
}

function MyPageScreen({ navigation }: MyPageScreenProps) {
  return (
    <View style={styles.Container}>
      <ProFile navigation={navigation} />
      <H h={16} />
      <Pressable onPress={() => navigation.navigate('category')} style={styles.SettingButton}>
        <BoxIcon />
        <Text>카테고리 관리</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 24,
  },

  SettingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: Color.gray2,
    borderRadius: 8,
  },
});

export default MyPageScreen;
