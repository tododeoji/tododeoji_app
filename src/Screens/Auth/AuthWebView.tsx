import React, { useLayoutEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useLoginStatus } from '../../stores/auth';
import { BASE_URL } from '@env';
import { storage } from '../../lib/mmkv';

function AuthPage({ navigation, route }: { navigation?: any; route?: any }) {
  const webViewRef = useRef<WebView>(null);
  const { setIsLoggedIn } = useLoginStatus();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params?.platform}로 로그인`,
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  return (
    <WebView
      ref={webViewRef}
      style={styles.container}
      source={{
        uri: `${BASE_URL}/oauth2/authorization/${route.params?.platform?.toLowerCase()}`,
      }}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes('auth/login')) {
          webViewRef.current?.injectJavaScript(`
          const postText = document.body.innerText;
          document.body.innerText = ''
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: 'AUTH_RESULT',
              data: postText,
            })
          );
          true;
        `);
        }
      }}
      onMessage={(event) => {
        const { type, data } = JSON.parse(event.nativeEvent.data);
        if (type === 'AUTH_RESULT' && data.charAt(0) === '{') {
          console.log(data, typeof data);
          const result = JSON.parse(data);

          const userToken = {
            accessToken: result.accessToken,
            accessTokenExp: result.accessTokenExp,
            refreshToken: result.refreshToken,
            refreshTokenExp: result.refreshTokenExp,
          };

          storage.set('userToken', JSON.stringify(userToken));
          storage.set('recent_login_platform', route.params?.platform?.toLowerCase());
          setIsLoggedIn(true);
        }
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
