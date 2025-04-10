import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

function AuthPage({ navigation, route }: { navigation: any; route: any }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params?.platform}로 로그인`,
      headerBackTitle: 'Back',
    });
  }, [navigation]);
  return (
    <WebView
      style={styles.container}
      source={{
        uri: 'https://github.com/tododeoji',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthPage;
