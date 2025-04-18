import MainRootStackNavigator from './MainRootStack';
import AuthStackNavigator from './AuthStack';
import { useLoginStatus } from '../stores/auth';
import { MMKV } from 'react-native-mmkv';
import { useEffect } from 'react';
export const storage = new MMKV();

function RootStackNavigator() {
  const { isLoggedIn, setIsLoggedIn } = useLoginStatus();

  useEffect(() => {
    const userInfo = storage.getString('userToken');
    console.log(userInfo?.length ? '값 있음' : '없음', userInfo);

    userInfo?.length ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [storage]);

  return isLoggedIn ? <MainRootStackNavigator /> : <AuthStackNavigator />;
}

export default RootStackNavigator;
