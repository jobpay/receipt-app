import React from "react";
import { Platform, View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

/**
 * AdMobバナー広告コンポーネント
 */
export const AdMobBannerItem = () => {
    return (
        <View>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID={
                    __DEV__ ? process.env.EXPO_PUBLIC_ADMOB_TEST_BANNER_ID
                    : Platform.select({
                        ios: process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_ID,
                        android: process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID,
                    })
                }
                servePersonalizedAds
            />
        </View>
    );
}; 