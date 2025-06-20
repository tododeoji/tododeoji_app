import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';
import { Pressable, StyleSheet, View, Alert } from 'react-native';
import { H, NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraIcon, CloseIcon } from '../../assets/icons';
import FastImage from 'react-native-fast-image';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { setRandomProfile } from '../../lib/randomProfile';
import FormBox from '../../Components/MyPage/FormBox';
import useProfileStore from '../../stores/profileStore';
import { Axios } from '../../lib/axios';

type ProfileFormData = {
  id: string;
  email: string;
  name: string;
  profileImgUrl?: string;
  introduce?: string;
  profileUrl?: string;
};

interface EditProfileScreenProps {
  navigation: any;
}

function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  const { profileData, updateProfileData } = useProfileStore();
  const [defaultProfileNumber, setDefaultProfileNumber] = useState<number>(profileData?.defaultProfileNum || 1);
  const [defaultProfileColor, setDefaultProfileColor] = useState<number>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      id: profileData?.id || '',
      email: profileData?.email || '',
      name: profileData?.name || '',
      profileImgUrl: profileData?.profileImgUrl || '',
      introduce: profileData?.introduce || '',
      profileUrl: profileData?.profileUrl || '',
    },
  });

  useEffect(() => {
    const profile = setRandomProfile(defaultProfileColor, defaultProfileNumber);
    setDefaultProfileColor(profile.profile);
  }, []);

  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          insets={insets}
          HeaderTitle="프로필 수정"
          RightComponent={<TouchableSVG SVG={CloseIcon} onPress={() => navigation.goBack()} />}
        />
      ),
    });
  }, [insets, navigation]);

  const handlePressSetDefaultProfile = () => {
    setValue('profileUrl', '');
    const randomProfile = setRandomProfile(defaultProfileColor);
    setDefaultProfileColor(randomProfile.profile);
    setDefaultProfileNumber(randomProfile.profileNum);
  };

  const handleImagePicker = async (onChange: (value: string) => void) => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets?.[0]?.uri) {
        onChange(result.assets[0].uri);
      } else if (result.errorMessage) {
        console.error('이미지 선택 오류:', result.errorMessage);
      }
    } catch (error) {
      console.error('이미지 선택 중 오류 발생:', error);
    }
  };

  const onSubmitForm = async (data: ProfileFormData) => {
    try {
      const response = await Axios.patch('/user/edit', {
        ...data,
      });

      if (response.data) {
        updateProfileData({
          ...data,
        });
        navigation.goBack();
      }
    } catch (error: any) {
      console.error('프로필 수정 중 오류 발생:', error);
      Alert.alert('프로필 수정 실패', error.message || '프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.', [
        { text: '확인' },
      ]);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>
        <Controller
          control={control}
          name="profileImgUrl"
          render={({ field: { onChange, value } }) => (
            <Pressable onPress={() => handleImagePicker(onChange)}>
              <FastImage source={value ? { uri: value } : defaultProfileColor} style={styles.ProfileImg} />
              <TouchableSVG SVG={CameraIcon} style={styles.ChangeImgButton} />
            </Pressable>
          )}
        />

        <H />

        <Pressable onPress={handlePressSetDefaultProfile}>
          <Text
            fontStyle={FontStyle.caption2}
            color={Color.gray3}
            style={{ textDecorationLine: 'underline', textDecorationColor: Color.gray3 }}
          >
            기본 이미지 변경
          </Text>
        </Pressable>

        <H h={16} />

        <View style={{ width: '100%' }}>
          <Controller
            control={control}
            name="name"
            rules={{ required: '이름을 입력해주세요.', maxLength: { value: 12, message: '이름은 최대 12글자에요.' } }}
            render={({ field: { onChange, value } }) => (
              <FormBox
                label="이름"
                placeholder="이름 입력"
                value={value}
                error={errors.name}
                onChange={onChange}
                countText={12}
              />
            )}
          />
          <Controller
            control={control}
            name="profileUrl"
            rules={{
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: '유효하지 않은 URL이에요.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormBox label="URL" placeholder="URL 입력" value={value} error={errors.profileUrl} onChange={onChange} />
            )}
          />

          <Controller
            control={control}
            name="introduce"
            rules={{ maxLength: { value: 50, message: '소개글은 최대 50글자에요.' } }}
            render={({ field: { onChange, value } }) => (
              <FormBox
                label="소개글"
                placeholder="소개글 입력"
                value={value}
                error={errors.introduce}
                onChange={onChange}
                countText={50}
              />
            )}
          />
        </View>
      </View>
      <Pressable style={[styles.SaveButton, { bottom: insets?.bottom || 16 }]} onPress={handleSubmit(onSubmitForm)}>
        <Text fontFamily={FontFamily.BOLD} style={{ textAlign: 'center' }}>
          수정완료
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },
  ProfileImg: { width: 80, height: 80, borderRadius: 40 },
  ChangeImgButton: { position: 'absolute', right: 0, bottom: 4 },
  SaveButton: {
    backgroundColor: Color.yellow,
    paddingVertical: 16,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: Color.gray2,
    position: 'absolute',
    left: 24,
    right: 24,
  },
});

export default EditProfileScreen;
