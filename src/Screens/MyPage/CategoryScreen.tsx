import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowBack } from '../../assets/icons';

interface CategoryScreenProps {
  navigation: any;
}

function CategoryScreen({ navigation }: CategoryScreenProps) {
  const insets = useSafeAreaInsets();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          insets={insets}
          HeaderTitle="카테고리 관리"
          LeftComponent={<TouchableSVG SVG={ArrowBack} onPress={() => navigation.goBack()} />}
        />
      ),
    });
  }, [insets, navigation]);

  return (
    <View style={styles.Container}>
      <Text>카테고리 관리</Text>
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

export default CategoryScreen;
