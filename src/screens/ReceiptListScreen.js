import React, {useEffect}  from 'react';
import {StyleSheet, SafeAreaView, Text, View, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {updateReceipts} from "../store/actions/receipt";
import { AdMobBannerItem } from '../components/ads';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from "@expo/vector-icons"

/** lib */
import * as Moment from '../lib/Moment';

/** component */
import { SwipListItem } from '../components/list';
import { AntButtonItem } from '../components/ui';
import { ToastItem } from '../components/feedback';
import ReceiptDetailItem from '../components/ReceiptDetailItem';


export default ReceiptListScreen = ({navigation, route}) => {
    const {targetDate} = route.params ?? false;
    const {targetMonth} = route.params ?? false;
    const {receipts} = useSelector(state => state.receipt);
    const [receiptList, setReceiptList] = React.useState([]);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [shoot, setShoot] = React.useState([]);
    const [visibleToast, setVisibleToast] = React.useState(false);

    navigation.setOptions({
        headerTintColor: "#FFF",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if(targetDate) {
            navigation.setOptions({
                title: Moment.getDateString(targetDate['dateString'],'MM月DD日')
            });
            // 日別絞り込みの場合
            setReceiptList(receipts
                .filter(r => Moment.getDateString(r.createdAt,'YYYY-MM-DD') === targetDate['dateString']));
        } else if(targetMonth) {
            navigation.setOptions({
                title: Moment.getDateString(targetMonth, 'YYYY年MM月')
            });
            // 月別絞り込みの場合
            setReceiptList(receipts
                .filter(r => Moment.getDateString(r.createdAt, 'YYYY-MM') === Moment.getDateString(targetMonth, 'YYYY-MM'))
                .sort((a, b) => cYmd(a.createdAt) > cYmd(b.createdAt) ? 1 : cYmd(a.createdAt) < cYmd(b.createdAt) ? -1 : 0));
        } else {
            // 最新の20件
            setReceiptList(receipts.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0).slice(0,19));
        }
    }, [receipts]);

    const openModal = () => {
        setShoot([]);
        setModalVisible(true);
    }

    const cYmd = (date) => {
        return Moment.getDateString(date,'YYYYMMDD');
    }

    /**
     * レシートデータの編集終了を検知
     */
    const finishReceiptEdit = () => {
        setModalVisible(false);
        setVisibleToast(true);
        setTimeout(() => {setVisibleToast(false)}, 1000);
    }
    

    const delFirst = (l) => {
        dispatch(updateReceipts({receipts: receipts
            .filter(r => r['id'] !== l['id'])}));
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {(!targetMonth) && <ToastItem visible={visibleToast} text="一覧に保存しました。"/>}
            {(!targetMonth) && 
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
                        targetDate={targetDate}
                    />
                </Modal>
            }
            <ScrollView>
                {
                    receiptList.length !== 0 && receiptList.map((listItem, index) => (
                        <SwipListItem 
                            l={listItem} 
                            i={index} 
                            navigation={navigation}
                            delFirst={(record) => delFirst(record)}
                        />
                    )) ||
                    <View>
                        <Text style={{textAlign:"center", marginTop:40, fontSize:18, color:"#666"}}>
                            <AntDesign name="exclamationcircleo" size={18} color="#666" />
                            レシートを登録してください。
                        </Text>
                        <View style={{alignItems:"center", marginTop:60}}>
                            <Text style={{fontSize:16, color:"#666"}}>
                                ※データの登録は手入力でもカメラ撮影でも可能です。
                            </Text>
                            <Text style={{fontSize:16, color:"#666"}}>
                                手入力は右下＋ボタンで登録画面を開けます。
                            </Text>
                        </View>
                    </View>

                }
            </ScrollView>
            {
                (!targetMonth) && 
                <View style={{position:"absolute", bottom:85, right:10}}>
                    <AntButtonItem 
                        btnName="plus"
                        btnColor="#63b7af"
                        parentMethod={() => {openModal()}}
                    />
                </View>
            }
            <View style={{position:"absolute", bottom:15}}>
                <AdMobBannerItem/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        flexDirection:"row",
        marginBottom:4
    },
    sum: {
        marginTop:12,
        marginRight:15,
        fontSize:24,
    }
});
