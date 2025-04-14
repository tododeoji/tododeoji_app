import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const unitID =
  Platform.select({
    ios: 'ca-app-pub-9754313600278594~1393539960',
    android: 'ca-app-pub-9754313600278594~7861873259',
  }) || '';

const adUnitId = __DEV__ ? TestIds.BANNER : unitID;

const AdmobBanner = () => {
  return (
    <View style={styles.admob}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  admob: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AdmobBanner;
