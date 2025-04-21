import MainRootStackNavigator from './MainRootStack';
import AuthStackNavigator from './AuthStack';
import { useLoginStatus } from '../stores/auth';
import { useEffect } from 'react';
import { storage, getStorageData } from '../lib/mmkv';

function RootStackNavigator() {
  const { isLoggedIn, setIsLoggedIn } = useLoginStatus();

  useEffect(() => {
    const userInfo = getStorageData('userToken');
    console.log(Object.keys(userInfo).length > 1 ? '토큰 있음' : '토큰 없음', userInfo, typeof userInfo);

    if (Object.keys(userInfo).length > 1) {
      const { accessTokenExp, refreshTokenExp } = userInfo;
      console.log(accessTokenExp, refreshTokenExp);
    }

    Object.keys(userInfo).length > 1 ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [storage]);

  return isLoggedIn ? <MainRootStackNavigator /> : <AuthStackNavigator />;
}

export default RootStackNavigator;
