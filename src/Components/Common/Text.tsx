import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text as RNText, TextProps as RNTextProps, ViewStyle } from 'react-native';
import { FontFamilyType, FontStyleType } from '../../type/font';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';

type TextProps = {
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  fontStyle?: FontStyleType;
  fontFamily?: FontFamilyType;
} & RNTextProps;

const Text = ({
  children,
  style: styleProp,
  color = Color.black,
  fontStyle = FontStyle.description2,
  fontFamily = FontFamily.REGULAR,
  ...rest
}: TextProps) => {
  const textStyle = useMemo(
    () => ({
      color,
      padding: 0,
      fontFamily,
      ...fontStyle,
    }),
    [color, fontFamily, fontStyle],
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
