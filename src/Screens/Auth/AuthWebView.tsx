import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useLoginStatus } from '../../stores/auth';

function AuthPage({ navigation, route }: { navigation?: any; route?: any }) {
  const { setIsLoggedIn } = useLoginStatus();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params?.platform}로 로그인`,
      headerBackTitle: 'Back',
    });

    setTimeout(() => {
      setIsLoggedIn(true);
    }, 3000);
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
