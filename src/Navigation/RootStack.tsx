import MainRootStackNavigator from './MainRootStack';
import AuthStackNavigator from './AuthStack';

function RootStackNavigator() {
  const isLoggedIn = false;

  return isLoggedIn ? <MainRootStackNavigator /> : <AuthStackNavigator />;
}

export default RootStackNavigator;
