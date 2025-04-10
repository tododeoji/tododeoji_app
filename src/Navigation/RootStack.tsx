import MainRootStackNavigator from './MainRootStack';
import AuthStackNavigator from './AuthStack';
import { useLoginStatus } from '../stores/auth';

function RootStackNavigator() {
  const { isLoggedIn } = useLoginStatus();

  return isLoggedIn ? <MainRootStackNavigator /> : <AuthStackNavigator />;
}

export default RootStackNavigator;
