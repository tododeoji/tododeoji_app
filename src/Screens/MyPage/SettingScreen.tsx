import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowBack } from '../../assets/icons';

interface MyPageScreenProps {
  navigation: any;
}

function MyPageScreen({ navigation }: MyPageScreenProps) {
  const insets = useSafeAreaInsets();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          insets={insets}
          HeaderTitle="설정"
          LeftComponent={<TouchableSVG SVG={ArrowBack} onPress={() => navigation.goBack()} />}
        />
      ),
    });
  }, [insets, navigation]);

  return (
    <View style={styles.Container}>
      <Text>hihi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default MyPageScreen;
