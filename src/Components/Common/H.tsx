import React from 'react';
import { StyleSheet, View } from 'react-native';

interface HProps {
  h?: number;
}

function H({ h = 4 }: HProps) {
  const styles = StyleSheet.create({
    Spacer: {
      height: h,
    },
  });

  return <View style={styles.Spacer} />;
}

export default H;
