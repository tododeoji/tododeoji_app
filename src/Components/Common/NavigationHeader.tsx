import React from 'react';
import { View, ViewStyle } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { FontFamily, FontStyle } from '../../Common/Font';
import Text from './Text';

interface NavigationHeaderProps {
  insets: EdgeInsets;
  HeaderTitle: string;
  RightComponent?: React.ReactNode;
}

function NavigationHeader({ insets, HeaderTitle, RightComponent }: NavigationHeaderProps) {
  return (
    <View style={getHeaderStyle(insets)}>
      <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.title2}>
        {HeaderTitle}
      </Text>
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

export default NavigationHeader;
