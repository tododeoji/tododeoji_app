import React, { useLayoutEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { H, Text } from '../../Components/Common';
import Color from '../../Common/Color';
import ProFile from '../../Components/MyPage/ProFile';
import { BoxIcon } from '../../assets/icons';
import { Axios } from '../../lib/axios';
import useProfileStore from '../../stores/profileStore';

interface MyPageScreenProps {
  navigation: any;
}

function MyPageScreen({ navigation }: MyPageScreenProps) {
  const { profileData, setProfileData } = useProfileStore();

  const getProfileData = async () => {
    try {
      const res = await Axios.get('/user/my');
      setProfileData(res.data);
    } catch (e) {
      console.log('error', e);
      console.error(e);
    }
  };

  useLayoutEffect(() => {
    getProfileData();
  }, []);

  return (
    <View style={styles.Container}>
      <ProFile profileData={profileData} navigation={navigation} />
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
    backgroundColor: Color.white,
    paddingHorizontal: 24,
  },
  SettingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Color.gray1,
  },
});

export default MyPageScreen;
