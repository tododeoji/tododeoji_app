import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { H, Text } from '../Common';
import Color from '../../Common/Color';
import { FontFamily, FontStyle } from '../../Common/Font';

interface FormBoxProps {
  label: string;
  placeholder?: string;
  value?: string;
  error?: any;
  onChange: () => void;
  countText?: number;
}

function FormBox({ label, placeholder, value, error, onChange, countText }: FormBoxProps) {
  return (
    <View style={styles.InputBox}>
      <View style={{ flexDirection: 'row', paddingLeft: 8, gap: 2 }}>
        <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1}>
          {label}
        </Text>
        {countText && (
          <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1} color={Color.gray3}>
            {`(${value?.length || 0}/${countText})`}
          </Text>
        )}
      </View>
      <View style={{ width: '100%' }}>
        <TextInput onChangeText={onChange} value={value} placeholder={placeholder} style={styles.Input} multiline />
        {error ? (
          <>
            <Text fontStyle={FontStyle.caption1} style={styles.error}>
              {error.message}
            </Text>
            <H h={2} />
          </>
        ) : (
          <H h={12} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  InputBox: { flexDirection: 'column', alignItems: 'flex-start', width: '100%' },
  Input: { backgroundColor: Color.gray1, padding: 16, borderRadius: 8 },
  error: { color: Color.red, paddingLeft: 8 },
});

export default FormBox;
