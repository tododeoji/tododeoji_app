import { useEffect } from 'react';
import MainRootStackNavigator from '@/Navigation/MainRootStack';
import AuthStackNavigator from '@/Navigation/AuthStack';
import { useLoginStatus } from '@/stores/auth';
import { storage, getStorageData } from '@/lib/mmkv';
import dayjs from 'dayjs';

function RootStackNavigator() {
  const { isLoggedIn, setIsLoggedIn } = useLoginStatus();

  useEffect(() => {
    const userInfo = getStorageData('userToken');

    if (Object.keys(userInfo).length > 1) {
      const { accessTokenExp } = userInfo;

      console.log(dayjs(accessTokenExp).isAfter(dayjs()), dayjs(accessTokenExp), dayjs());
      if (dayjs(accessTokenExp).isAfter(dayjs())) {
        setIsLoggedIn(true);
      } else {
        console.log('토큰 만료');
        storage.delete('userToken');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [storage]);

  return isLoggedIn ? <MainRootStackNavigator /> : <AuthStackNavigator />;
}

export default RootStackNavigator;
