import React from 'react';
import { DimensionValue, Pressable, StyleSheet } from 'react-native';
import { Text } from '.';
import { FontFamily } from '../../Common/Font';
import Color from '../../Common/Color';

interface ConfirmButtonProps {
  title: string;
  backgroundColor: string;
  color: string;
  width?: DimensionValue;
  onPressButton: () => void;
}

function ConfirmButton({ title, backgroundColor, color, onPressButton, width = 128 }: ConfirmButtonProps) {
  return (
    <Pressable
      style={[styles.confirmButton, { backgroundColor: backgroundColor, width: width }]}
      onPress={onPressButton}
    >
      <Text fontFamily={FontFamily.BOLD} color={color} textAlign="center">
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  confirmButton: { width: 128, paddingVertical: 16, borderWidth: 1, borderColor: Color.gray2, borderRadius: 28 },
});

export default ConfirmButton;
