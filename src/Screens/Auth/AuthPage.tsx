import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../Components/Common';
import { AppleIcon, DuzyIcon, GoogleIcon, KakaoIcon, NaverIcon } from '../../assets/icons';
import { FontFamily } from '../../Common/Font';
import Color from '../../Common/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthButton from '../../Components/Auth/AuthButton';

function AuthPage({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const OAuthPlatform = [
    { platform: 'kakao', icon: KakaoIcon, color: '#FDE500', fontColor: '#392020' },
    { platform: 'naver', icon: NaverIcon, color: '#03C75A', fontColor: Color.white },
    { platform: 'apple', icon: AppleIcon, color: Color.black, fontColor: Color.white },
    { platform: 'google', icon: GoogleIcon, color: Color.white, fontColor: Color.black },
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, { paddingTop: insets?.top }]}>
        <DuzyIcon width={120} height={120} />
        <View style={{ flexDirection: 'row' }}>
          <Text color={Color.gray3}>당신의 귀여운 일정 관리 파트너, </Text>
          <Text fontFamily={FontFamily.BOLD}>투두더지</Text>
        </View>
      </View>
      <View style={[styles.platformButtonContainer, { paddingBottom: insets?.bottom + 18 }]}>
        {OAuthPlatform.map(({ platform, icon, color, fontColor }) => (
          <AuthButton
            key={platform}
            platform={platform}
            Icon={icon}
            color={color}
            fontColor={fontColor}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  platformButtonContainer: {
    width: '100%',
    gap: 8,
  },
  platformButtonBox: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});

export default AuthPage;
