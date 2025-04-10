import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../Components/Common';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { SvgProps } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RecentLoginIcon } from '../../assets/icons';

interface AuthButtonProps {
  platform: string;
  Icon: React.FC<SvgProps>;
  color: string;
  fontColor: string;
  navigation: any;
}

export default function AuthButton({ platform, Icon, color, fontColor, navigation }: AuthButtonProps) {
  const recentLoginPlatform = 'apple';
  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <View>
      <TouchableWithoutFeedback
        style={[
          styles.platformButtonBox,
          { backgroundColor: color },
          platform === 'google' && { borderColor: Color.gray2, borderWidth: 1 },
        ]}
        onPress={() => navigation.navigate('authweb', { platform: capitalize(platform) })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Icon />
          <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.description1} color={fontColor}>
            {capitalize(platform)}로 로그인
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {recentLoginPlatform === platform && <RecentLoginIcon style={{ position: 'absolute', right: 4, top: -33 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  platformButtonBox: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});
