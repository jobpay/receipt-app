import React, {useEffect}  from 'react';
import {StyleSheet, SafeAreaView, View, Modal } from 'react-native';
import { Camera } from 'expo-camera';

/** lib */
import * as Scan from '../lib/Scan';
import * as IntestitialAd from '../lib/IntestitialAd';
import * as AlertItem from '../lib/Alert';

/** components */
import { SpinnerItem, ToastItem } from '../components/feedback';
import { CameraItem } from '../components/camera';
import ReceiptDetailItem from '../components/ReceiptDetailItem';

export default CameraScreen = ({navigation}) => {
    const [hasPermission, setHasPermission] = React.useState(null);
    const [camera, setCamera] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [type] = React.useState(Camera.Constants.Type.back);
    const [shoot, setShoot] = React.useState([]);
    const [spinner, setSpinner] = React.useState(false);
    const [visibleToast, setVisibleToast] = React.useState(false);
    const [visibleToastErr, setVisibleToastErr] = React.useState(false);
    const [adCount, setAdCount] = React.useState(5);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    // ユーザーが意図的にPermissionを不許可にしている場合
    // アラートを表示して設定画面に移動する
    if (hasPermission === false) {
          AlertItem.cameraPermission();
    }

    /**
     * レシートデータの編集終了を検知
     */
    const finishReceiptEdit = () => {
        setModalVisible(false);
        setVisibleToast(true);
        setTimeout(() => {setVisibleToast(false)}, 1000);
    }

    /**
     * レシート撮影
     */
    const snap = async () => {
        if (camera) {
            setSpinner(true);
            // 写真を撮影
            let photo = await camera.takePictureAsync({base64: true});

            // 5回に1回インタースティシャルを出す
            if(adCount === 5) {
                IntestitialAd.dispAd();
                setAdCount(1)
            }
            setAdCount(adCount + 1);

            // cloudVisionから画像の解析結果を取得
            let data = await Scan.getCVRes(photo.base64);

            if(!data) {
                setSpinner(false);
                setVisibleToastErr(true);
                setTimeout(() => {setVisibleToastErr(false)}, 1000);
            }

            // JSONオブジェクトから必要な情報をマッピングする
            let mapData = await Scan.mapJsonObject(data);
            // オブジェクトを行別にする
            let convertData = Scan.convertRowData(mapData);
            // 行別オブジェクトを左から順番に並べて文字結合する
            convertData = Scan.sortFromLeftAndJoinStr(convertData);
            // 画面用のオブジェクトを作成する
            let shootResult = Scan.createPriceObject(convertData);

            setShoot(shootResult);
            setSpinner(false);
            setModalVisible(true);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SpinnerItem spinner={spinner} text="解析中..."/>
            <ToastItem visible={visibleToast} text="一覧に保存しました。"/>
            <ToastItem visible={visibleToastErr} text="読み取りに失敗しました。"/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <ReceiptDetailItem 
                    shoot={shoot}
                    setShoot={s => {setShoot(s)}}
                    finish={() => {finishReceiptEdit()}}
                    setModalVisible={() => {setModalVisible(!modalVisible);}}
                    isModalContent={true}
                />
            </Modal>
            <CameraItem
                type={type}
                setCamera={(ref) => {setCamera(ref);}}
                snap={() => {snap()}}
            />
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({});