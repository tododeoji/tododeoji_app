import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowBack } from '../../assets/icons';

interface EditProfileScreenProps {
  navigation: any;
}

function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  const insets = useSafeAreaInsets();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          insets={insets}
          HeaderTitle="프로필 수정"
          LeftComponent={<TouchableSVG SVG={ArrowBack} onPress={() => navigation.goBack()} />}
        />
      ),
    });
  }, [insets, navigation]);

  return (
    <View style={styles.Container}>
      <Text>프로필 수정</Text>
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

export default EditProfileScreen;
