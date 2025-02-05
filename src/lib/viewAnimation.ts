import { SharedValue, withTiming } from 'react-native-reanimated';

export const fadeOut = (fadeAnim: SharedValue<number>, duration: number = 100) => {
  fadeAnim.value = withTiming(0, { duration });
};

export const fadeIn = (fadeAnim: SharedValue<number>, duration: number = 200) => {
  fadeAnim.value = withTiming(1, { duration });
};
