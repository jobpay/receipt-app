import {Alert} from 'react-native';
import * as Linking from 'expo-linking';

export const cameraPermission = () => {
    Alert.alert(
        'カメラが無効になっています',
        "許可しますか？",
        [
            {
                text: "キャンセル",
                style: "cancel"
            },
            {
                text: "設定する",
                onPress: () => {Linking.openURL("app-settings:");}
            }
        ]
    );
}
