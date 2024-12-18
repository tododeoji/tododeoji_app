import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text as RNText, TextProps as RNTextProps, View, ViewStyle } from 'react-native';

type TextProps = {
  children?: React.ReactNode;
  wordBreak?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  lineHeight?: number;
} & RNTextProps;

/**
 *
 * @param {boolean} wordBreak
 * word-break 옵션을 사용할 경우
 * width, margin, padding과 같은 옵션들은 containerStyle으로 전달해주어야 합니다.
 */
const Text = ({
  children,
  wordBreak,
  style: styleProp,
  containerStyle,
  color = '#000',
  fontSize = 14,
  fontWeight = 'normal',
  lineHeight,
  ...rest
}: TextProps) => {
  const textStyle = useMemo(
    () => ({
      color,
      fontSize,
      fontWeight,
      lineHeight,
      padding: 0,
    }),
    [color, fontSize, fontWeight, lineHeight],
  );
  if (wordBreak && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <View style={[styles.container, containerStyle]}>
        {words.map((text, index) => (
          <RNText key={index} style={[styles.textBase, textStyle, styleProp]} allowFontScaling={false} {...rest}>
            {text}{' '}
          </RNText>
        ))}
      </View>
    );
  }

  return (
    <RNText style={[styles.textBase, textStyle, styleProp]} allowFontScaling={false} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textBase: {
    color: '#000',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});

export default Text;
