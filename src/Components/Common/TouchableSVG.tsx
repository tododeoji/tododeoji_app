import { ViewStyle } from 'react-native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type ToouchableSVGProps = {
  style?: ViewStyle;
  SVG: any;
  width?: number;
  height?: number;
  size?: number;
  onPress?: any;
  disabled?: boolean;
  p?: number;
  fill?: string;
};

const TouchableSVG = (props: ToouchableSVGProps, { ...otherProps }) => {
  const { style, SVG, width, height, size, onPress = () => {}, disabled, p, fill = '#000' } = props;
  return (
    <TouchableWithoutFeedback style={style} {...otherProps} onPress={() => onPress()} disabled={disabled}>
      <SVG width={size ? size : width} height={size ? size : height} style={{ padding: p || 0 }} fill={fill} />
    </TouchableWithoutFeedback>
  );
};

export default TouchableSVG;
