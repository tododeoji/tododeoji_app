import React, { useLayoutEffect } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowBack } from '../../assets/icons';
import Color from '../../Common/Color';
import { FontFamily, FontStyle } from '../../Common/Font';

interface MyPageScreenProps {
  navigation: any;
}

function MyPageScreen({ navigation }: MyPageScreenProps) {
  const LinkMenu = [
    { title: '공지사항', url: 'https://github.com/tododeoji' },
    { title: '문의하기', url: 'https://github.com/tododeoji' },
    { title: '이용약관', url: 'https://github.com/tododeoji' },
    { title: '개인정보처리방침', url: 'https://github.com/tododeoji' },
    { title: '릴리즈 노트', url: 'https://github.com/tododeoji' },
    { title: '앱 버전 정보', version: '1.0.0' },
  ];

  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          insets={insets}
          HeaderTitle="설정"
          LeftComponent={<TouchableSVG SVG={ArrowBack} onPress={() => navigation.goBack()} />}
        />
      ),
    });
  }, [insets, navigation]);

  return (
    <View style={styles.Container}>
      {LinkMenu.map(({ title, url, version = '' }, index) => (
        <Pressable
          key={index + title}
          onPress={() => url && Linking.openURL(url)}
          style={[
            styles.LinkButton,
            (index + 1) % 2 === 0
              ? { borderBottomRightRadius: 8, borderBottomLeftRadius: 8, marginBottom: 24 }
              : { borderTopRightRadius: 8, borderTopLeftRadius: 8, marginBottom: 1 },
          ]}
        >
          <Text>{title}</Text>
          <Text color={Color.gray3}>{version}</Text>
        </Pressable>
      ))}

      <View style={[styles.AccountButton, { bottom: insets.bottom + 32 }]}>
        <Pressable>
          <Text fontFamily={FontFamily.REGULAR} fontStyle={FontStyle.caption1} color={Color.gray3}>
            로그아웃
          </Text>
        </Pressable>
        <Pressable>
          <Text fontFamily={FontFamily.REGULAR} fontStyle={FontStyle.caption1} color={Color.gray3}>
            계정 삭제
          </Text>
        </Pressable>
      </View>
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
  LinkButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.gray1,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  AccountButton: {
    flexDirection: 'column',
    gap: 4,
    position: 'absolute',
    left: 40,
  },
});

export default MyPageScreen;
