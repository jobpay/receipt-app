import React, {useEffect}  from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import {useDispatch, useSelector} from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as StoreReview from 'expo-store-review';

/** reducer */
import {addReceipt, updateReceipts} from "../store/actions/receipt";
import {incrementReceiptId} from "../store/actions/receipt-id";

/** lib */
import * as Scan from '../lib/Scan';
import * as Moment from '../lib/Moment';

/** components */
import { GoodsItemList } from './list';
import { OverlayItem } from './feedback';
import { CategoryEditItem } from './form';
import {
    AntButtonItem,
    CloseButtonItem,
    TitleItem,
    SumPriceItem,
    DateTimeStrItem,
    DateTimeEditItem,
    AddRecordItem,
    UpdateRecordItem,
    AddTitleItem
} from './ui';

const ReceiptDetailItem = ({
    shoot, 
    setShoot, 
    finish, 
    setModalVisible, 
    isModalContent, 
    receipt,
    targetDate
}) => {
    const [sum, setSum] = React.useState(0);
    const [sumStr, setSumStr] = React.useState('0');
    const [visible, setVisible] = React.useState(false);
    const [visibleUpdate, setVisibleUpdate] = React.useState(false);
    const [visibleTitle, setVisibleTitle] = React.useState(false);
    const [visibleCreatedAt, setVisibleCreatedAt] = React.useState(false);
    const [visibleCategory, setVisibleCategory] = React.useState(false);
    const [newGoods, setNewGoods] = React.useState('');
    const [newPrice, setNewPrice] = React.useState('');
    const [updId, setUpdId] = React.useState(null);
    const [updGoods, setUpdGoods] = React.useState('');
    const [updPrice, setUpdPrice] = React.useState('');
    const [title, setTitle] = React.useState('無題');
    const [createdAt, setCreatedAt] = React.useState(null);
    const [categoryId, setCategoryId] = React.useState(null);
    const [categoryName, setCategoryName] = React.useState('未選択');

    const {receiptId} = useSelector(state => state.receiptId);
    const {receipts} = useSelector(state => state.receipt);
    const categories = useSelector(state => state.category.categories);
    const dispatch = useDispatch();

    useEffect(() => {

        if(targetDate !== undefined) {
            // 日別データから来た場合
            setCreatedAt(new Date(targetDate.dateString));
        }

        // 更新画面の場合
        if(receipt) {
            setTitle(receipt.title);
            setCreatedAt(receipt.createdAt);
            // カテゴリー機能追加前レシートを考慮
            let categoryId = receipt.categoryId ?? null;
            setCategoryId(categoryId);
        }
    }, []);

    // shootの変更が即時反映されないので useEffectをチェーンで呼び出す。
    useEffect(() => {
        if(shoot.length !== 0) {
            setSum(shoot.map(s => Number(s[1]) ?? 0).reduce((p, c) => p + c));
        }
    }, [shoot]);

    // countが更新されたら呼ばれる部分
    useEffect(() => {
        setSumStr(sum.toString());
    }, [sum]);

    // categoryIdが更新されたら呼ばれる部分
    useEffect(() => {
        let selectCategory = categories.find(c => c.id === categoryId);
        if(selectCategory !== undefined) {
            setCategoryName(selectCategory['name']);
        }
    }, [categoryId]);
    

    /**
     * ファイル出力
     */
    const exportFile = async () => {
        // 日本語文字が含まれるとファイル書き込みのタイミングでエラーになるみたい
        let fileName = 'okaimono-db-' + Moment.getDateString(new Date(), 'yyyyMMDDHHmmss');
        let fileUri = FileSystem.documentDirectory + fileName + ".csv";
        let txtFile = Scan.convertToCSV(shoot);
        await FileSystem.writeAsStringAsync( fileUri, txtFile, { encoding: FileSystem.EncodingType.UTF8 })
        await Sharing.shareAsync(fileUri)
        await FileSystem.deleteAsync(fileUri)
    }

    /**
     * レコード追加
     */
    const addRecord = () => {
        let lastRecord = shoot[shoot.length -1];
        let maxId = lastRecord !== undefined ? lastRecord[2] + 1 : 1;
        setShoot([...shoot,[newGoods, newPrice ?? '0', maxId]]);
        toggleOverlay();
    }

    /**
     * レコード更新
     */
    const updateRecord = () => {
        shoot = [...shoot.filter(s => s[2] !== updId),
        [updGoods, updPrice, updId]]
        .sort((a, b) => a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : 0);
        setShoot(shoot);
        toggleOverlayUpdate();
    }

    /**
     * レコード削除
     */
    const delRecord = (recordId) => {
        // 金額と品物名が一致するものを省く
        setShoot(shoot.filter(v => v[2] !== recordId));
    }

    /**
     * レコード追加ポップ表示切り替え
     */    
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleOverlayUpdate = () => {
        setVisibleUpdate(!visibleUpdate);
    }

    const toggleOverlayCreatedAt = () => {
        setVisibleCreatedAt(!visibleCreatedAt);
    }

    const toggleOverlayCategory = () => {
        setVisibleCategory(!visibleCategory);
    }

    /**
     * レコード更新ポップ表示切り替え
     */    
    const edit = (record) => {
        setUpdGoods(record[0]);
        setUpdPrice(record[1]);
        setUpdId(record[2]);
        toggleOverlayUpdate();
    };

    /**
     * タイトル編集
     */
    const addTitle = () => {
        setTitle(title);
        toggleOverlayTitle();
    }

    /**
     * 登録時間編集
     */
    const editCreatedAt = () => {
        setCreatedAt(createdAt);
        toggleOverlayCreatedAt();
    }

    /**
     * カテゴリ選択
     */
     const selectCategory = () => {
        //setCategoryId(categoryId);

        if(categoryId !== null) {
            let selectCategory = categories.find(c => c.id === categoryId);
            if(selectCategory !== undefined) {
                setCategoryName(selectCategory['name']);
            }
        } else {
            setCategoryName('未選択');
        }
        toggleOverlayCategory();
    }

    /**
     * タイトルポップ表示切り替え
     */
    const toggleOverlayTitle = () => {
        setVisibleTitle(!visibleTitle);
    };

    /**
     * レシートデータを登録
     */
    const registReceipt = () => {

        let newReceipt = {
            id: receiptId,
            title: title,
            shoots: shoot,
            categoryId: categoryId,
            sum: sum,
            createdAt: createdAt ?? new Date()
        }

        // レシートデータを登録
        dispatch(addReceipt({receipt: newReceipt}));
        // レシートIDのシーケンスをカウントアップ
        dispatch(incrementReceiptId({receiptId: receiptId}));

        // 20個目 と 100個目の登録時に表示
        if(receiptId === 20 || receiptId === 100) {
            if (StoreReview.hasAction()) {
                const url = StoreReview.storeUrl();
                StoreReview.requestReview();
            }
        }

        // 処理の終了を親コンポーネントに検知させる
        finish();
    }

    /**
     * レシートデータを更新
     */
    const updateReceipt = () => {

        // shootsの変更をupdateReceiptsが直接検知できないので
        // titleの変更を意図的に検知させる
        setTitle(title);
        let updReceipts = [...receipts.filter(r => r.id !== receipt.id),
            {
                id: receipt.id,
                title: title,
                shoots: shoot,
                categoryId:categoryId,
                sum: sum,
                createdAt: createdAt                
            }]
        .sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
        dispatch(updateReceipts({receipts: updReceipts}));
        // 処理の終了を親コンポーネントに検知させる
        finish();
    }

    return (
        <View style={styles.centeredView}>
            <OverlayItem
                isVisible={visible} 
                onBackdropPress={toggleOverlay}
                container= { 
                    <AddRecordItem 
                        setNewGoods={text => setNewGoods(text)}
                        setNewPrice={text => setNewPrice(text)}
                        addRecord={() => addRecord()}
                    />
                }
            />
            <OverlayItem
                isVisible={visibleTitle} 
                onBackdropPress={toggleOverlayTitle}
                container= {
                    <AddTitleItem 
                        setTitle={text => setTitle(text)}
                        addTitle={() => addTitle()}
                        title={title}
                    />
                }
            />
            <OverlayItem
                isVisible={visibleUpdate} 
                onBackdropPress={toggleOverlayUpdate}
                container= {
                    <UpdateRecordItem 
                        setUpdGoods={text => setUpdGoods(text)}
                        setUpdPrice={text => setUpdPrice(text)}
                        updateRecord={() => updateRecord()}
                        goods={updGoods}
                        price={updPrice}
                    />
                }
            />
            <OverlayItem
                isVisible={visibleCreatedAt} 
                onBackdropPress={toggleOverlayCreatedAt}
                container= {
                    <DateTimeEditItem 
                        setCreatedAt={date => setCreatedAt(date)}
                        editCreatedAt={() => editCreatedAt()}
                        createdAt={createdAt}
                    />
                }
            />
            <OverlayItem
                isVisible={visibleCategory} 
                onBackdropPress={toggleOverlayCategory}
                container= {
                    <CategoryEditItem 
                        selectCategory={() => selectCategory()}
                        setCategoryId={val => setCategoryId(val)}
                        categoryId={categoryId}
                    />
                }
            />
            <View style={isModalContent && styles.modalView}>
                
                <ListItem key={1} bottomDivider onPress={() => {toggleOverlayTitle()}}>
                    <ListItem.Content>
                        <View style={styles.listItemView}>
                            <Text style={styles.listItemTitle}>タイトル</Text>
                            <Text style={styles.listItemTitle}>{title}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
                <ListItem key={2} bottomDivider onPress={() => {toggleOverlayCreatedAt()}}>
                    <ListItem.Content>
                        <View style={styles.listItemView}>
                            <Text style={styles.listItemTitle}>日付</Text>
                            <Text style={styles.listItemTitle}><DateTimeStrItem datetime={createdAt}/></Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
                <ListItem key={3} bottomDivider onPress={() => {toggleOverlayCategory()}}>
                    <ListItem.Content>
                        <View style={styles.listItemView}>
                            <Text style={styles.listItemTitle}>カテゴリ</Text>
                            <Text style={styles.listItemTitle}>{categoryName}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
                {/* <TitleItem title={title} toggleOverlayTitle={() => {toggleOverlayTitle();}} />
                <DateTimeStrItem datetime={createdAt} toggleOverlayCreatedAt={() => {toggleOverlayCreatedAt();}} /> */}
                {isModalContent && <CloseButtonItem setModalVisible={() => {setModalVisible(false);}}/>}
                <GoodsItemList 
                    shoot={shoot} 
                    delRecord={(i) => delRecord(i)}
                    edit={(i) => edit(i)}
                />

                <SumPriceItem sumStr={sum} />
                <View style={styles.btnArea}>
                    <AntButtonItem 
                        btnName="form"
                        btnColor="#1587D8"
                        parentMethod={() => {toggleOverlay()}}
                    />
                    {isModalContent && 
                        <AntButtonItem 
                            btnName="addfile"
                            btnColor="#E7B80A"
                            parentMethod={() => {registReceipt()}}
                        /> ||
                        <AntButtonItem 
                            btnName="reload1"
                            btnColor="#E7B80A"
                            parentMethod={() => {updateReceipt()}}
                        /> 
                    }
                    <AntButtonItem 
                        btnName="download"
                        btnColor="#0ABC89"
                        parentMethod={() => {exportFile()}}
                    />
                </View>
            </View>
        </View>
    );
};

export default ReceiptDetailItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalView: {
        borderRadius: 20,
        height:"94%",
        backgroundColor: "#FFF",
        paddingTop: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    sumText: {
        textAlign:"center",
        fontSize:22,
        marginTop:18,
        marginBottom:10
    },
    btnArea: {
        marginTop: 10,
        width: "100%", 
        height:80,
        flexDirection: 'row', 
        justifyContent:'center',
        marginBottom:8
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
