import React, {useEffect}  from 'react';
import {StyleSheet, SafeAreaView, Text, View, Modal } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AdMobBannerItem } from '../components/ads';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as StoreReview from 'expo-store-review';

/** 
 * アプリバージョン
 */
const appVersion = Constants.manifest.version;

export default SettingScreen = ({navigation}) => {

    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    const onReview = () => {
        const url = StoreReview.storeUrl();
        Linking.openURL(`${url}?action=write-review`);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ListItem key={1} bottomDivider>
                <ListItem.Content>
                    <View style={styles.listItemView}>
                        <Text style={styles.listItemTitle}>アプリVer</Text>
                        <Text style={styles.listItemTitle}>{appVersion}</Text>
                    </View>
                </ListItem.Content>
            </ListItem>
            {/* 一旦保留 
            <ListItem key={2} bottomDivider onPress={() => navigation.navigate("Contact")}>
                <ListItem.Content>
                    <View style={styles.listItemView}>
                        <Text style={styles.listItemTitle}>お問い合わせ</Text>
                    </View>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem> */}
            <ListItem key={2} bottomDivider onPress={() => {navigation.navigate("Category")}}>
                <ListItem.Content>
                    <View style={styles.listItemView}>
                        <Text style={styles.listItemTitle}>カテゴリ設定</Text>
                    </View>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem key={3} bottomDivider onPress={() => {onReview()}}>
                <ListItem.Content>
                    <View style={styles.listItemView}>
                        <Text style={styles.listItemTitle}>レビューを書く</Text>
                    </View>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <View style={{position:"absolute", bottom:15}}>
                <AdMobBannerItem/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItemView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listItemTitle: {
        marginTop: 0,
        fontSize: 18
    }
});
