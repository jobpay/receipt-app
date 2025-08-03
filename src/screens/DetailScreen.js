import React, {useEffect}  from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

/** components */
import { ToastItem } from '../components/feedback';
import ReceiptDetailItem from '../components/ReceiptDetailItem';


export default DetailScreen = ({navigation, route}) => {
    const {receipt} = route.params;
    const [shoot, setShoot] = React.useState([]);
    const [visibleToast, setVisibleToast] = React.useState(false);

    useEffect(() => {
        setShoot(receipt.shoots);
    }, []);

    navigation.setOptions({
        headerTintColor: "#FFF",
    });

    /**
     * レシートデータの編集終了を検知
     */
    const finishReceiptEdit = () => {
        setVisibleToast(true);
        setTimeout(() => {setVisibleToast(false)}, 1000);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:"#FFF"}}>
            <ToastItem visible={visibleToast} text="編集が完了しました。"/>
            <ReceiptDetailItem 
                shoot={shoot}
                setShoot={s => {setShoot(s)}}
                finish={() => {finishReceiptEdit()}}
                setModalVisible={() => {}}
                isModalContent={false}
                receipt={receipt}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});
