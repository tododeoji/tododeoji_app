import React from 'react';
import { StyleSheet, View } from 'react-native';

interface WProps {
  w?: number;
}

function W({ w = 4 }: WProps) {
  const styles = StyleSheet.create({
    Spacer: {
      width: w,
    },
  });

  return <View style={styles.Spacer} />;
}

export default W;
