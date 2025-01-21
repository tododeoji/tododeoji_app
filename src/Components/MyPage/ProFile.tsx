import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from '../Common';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';

function ProFile({ navigation }: { navigation: any }) {
  return (
    <View style={styles.ProfileBox}>
      <FastImage style={styles.Image} source={require('../../assets/images/yellow_dozy.png')} />
      <View style={styles.TextBox}>
        <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.description2}>
          두지
        </Text>
        <Text fontStyle={FontStyle.caption1}>email@email.com</Text>
        <Text fontStyle={FontStyle.description2} style={styles.Bio}>
          안녕하세요두지예요안녕하세요두지예요안녕하세요두지예요안녕하세요두지예요안녕하세요두지예요안녕하세요
        </Text>
        <Pressable onPress={() => navigation.navigate('editProfile')} style={styles.EditButton}>
          <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption2}>
            프로필 수정
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ProfileBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 16,
  },
  Image: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  TextBox: { flexDirection: 'column', alignItems: 'flex-start' },
  Bio: { maxWidth: '80%', marginVertical: 8 },
  EditButton: { backgroundColor: Color.gray1, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20 },
});

export default ProFile;
