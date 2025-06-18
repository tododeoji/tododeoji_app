import { SharedValue, withTiming, Easing } from 'react-native-reanimated';

export const fadeOut = (fadeAnim: SharedValue<number>, duration: number = 150) => {
  fadeAnim.value = withTiming(0, {
    duration,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  });
};

export const fadeIn = (fadeAnim: SharedValue<number>, duration: number = 200) => {
  fadeAnim.value = withTiming(1, {
    duration,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  });
};
