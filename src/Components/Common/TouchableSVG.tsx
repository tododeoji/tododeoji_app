import { ViewStyle } from 'react-native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type TouchableSVGProps = {
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

const TouchableSVG = ({
  style,
  SVG,
  width = 20,
  height = 20,
  size = 20,
  onPress,
  disabled,
  p,
  fill,
}: TouchableSVGProps) => {
  return (
    <TouchableWithoutFeedback style={style} onPress={onPress} disabled={disabled}>
      <SVG width={size ? size : width} height={size ? size : height} style={{ padding: p || 0 }} fill={fill} />
    </TouchableWithoutFeedback>
  );
};

export default TouchableSVG;
