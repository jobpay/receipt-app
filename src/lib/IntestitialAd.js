import { AdMobInterstitial, Platform } from 'expo-ads-admob';

/**
 * インタースティシャル広告を出す
 */
export const dispAd = async () => {
    try {
        if(__DEV__){
            AdMobInterstitial.setAdUnitID(process.env.EXPO_PUBLIC_ADMOB_TEST_INTERSTITIAL_ID);
        }else{
            if(Platform.OS === 'ios'){
                AdMobInterstitial.setAdUnitID(process.env.EXPO_PUBLIC_ADMOB_IOS_INTERSTITIAL_ID);
            }else{
                AdMobInterstitial.setAdUnitID(process.env.EXPO_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_ID);
            }
        }
        await AdMobInterstitial.requestAdAsync();
        await AdMobInterstitial.showAdAsync();
    } catch (error) {
        console.error('AdMob Interstitial error:', error);
    }
}