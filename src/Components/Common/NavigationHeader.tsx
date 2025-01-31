import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { FontFamily, FontStyle } from '../../Common/Font';
import Text from './Text';

interface NavigationHeaderProps {
  insets: EdgeInsets;
  HeaderTitle: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
}

function NavigationHeader({ insets, HeaderTitle, LeftComponent, RightComponent }: NavigationHeaderProps) {
  return (
    <View style={getHeaderStyle(insets)}>
      <View style={styles.LeftAndTitle}>
        {LeftComponent}
        <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.title2}>
          {HeaderTitle}
        </Text>
      </View>
      {RightComponent}
    </View>
  );
}

const getHeaderStyle = (insets: EdgeInsets): ViewStyle => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  paddingHorizontal: 24,
  paddingTop: (insets.top || 10) + 6,
  paddingBottom: 16,
});

const styles = StyleSheet.create({
  LeftAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default NavigationHeader;
