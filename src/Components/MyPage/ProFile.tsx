import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from '../Common';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { LinkIcon } from '../../assets/icons';
import { setRandomProfile } from '../../lib/randomProfile';

function ProFile({ navigation }: { navigation: any }) {
  const mockProfile = {
    profileUrl: '',
    defaultProfileNum: 1,
    name: '두지',
    email: 'duzy@email.com',
    bio: '안녕하세요 저는 두지예요 귀엽쬬',
    link: 'https://testduzy.com',
  };

  return (
    <View>
      <View style={styles.ProfileBox}>
        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <FastImage style={styles.Image} source={setRandomProfile(undefined, mockProfile.defaultProfileNum).profile} />
          <Pressable onPress={() => navigation.navigate('editProfile')} style={styles.EditButton}>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption2}>
              프로필 수정
            </Text>
          </Pressable>
        </View>
        <View style={styles.TextBox}>
          <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.description2}>
            {mockProfile.name}
          </Text>
          <Text fontStyle={FontStyle.caption1} color={Color.gray3}>
            {mockProfile.email}
          </Text>
          <View style={{ width: '100%', paddingRight: '35%' }}>
            <Text fontStyle={FontStyle.description2} style={styles.Bio}>
              {mockProfile.bio}
            </Text>
          </View>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <LinkIcon width={16} height={16} />
            <Text fontStyle={FontStyle.caption2} color={Color.blue}>
              {mockProfile.link}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ProfileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 16,
  },
  Image: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  TextBox: { flexDirection: 'column', alignItems: 'flex-start' },
  Bio: { marginVertical: 8 },
  EditButton: {
    backgroundColor: Color.gray1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
});

export default ProFile;
