import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text as RNText, TextProps as RNTextProps, ViewStyle } from 'react-native';

type TextProps = {
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontFamily?: string;
  lineHeight?: number;
} & RNTextProps;

const Text = ({
  children,
  style: styleProp,
  color = '#000',
  fontSize = 14,
  fontWeight = 'normal',
  fontFamily = 'Pretendard-Regular',
  lineHeight,
  ...rest
}: TextProps) => {
  const textStyle = useMemo(
    () => ({
      color,
      fontSize,
      fontWeight,
      fontFamily,
      lineHeight,
      padding: 0,
    }),
    [color, fontSize, fontWeight, fontFamily, lineHeight],
  );

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
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});

export default Text;
