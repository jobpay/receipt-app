import React, {useEffect}  from 'react';
import {StyleSheet, SafeAreaView, View, Text, RefreshControl, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Button } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { AntDesign } from "@expo/vector-icons"
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart, BarChart } from "react-native-chart-kit";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
   
const chartConfig = {
    backgroundGradientFrom: "black",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "black",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => "black",
};

/** reducer */
import {updatetTargetMonth} from "../store/actions/target-month";

/** lib */
import * as Moment from '../lib/Moment';

/** components */
import { AdMobBannerItem } from '../components/ads';
import { SumPriceMonthlyItem } from '../components/ui';

export default MonthlyScreen = ({navigation, route}) => {
    const [monthReceipts, setMonthReceipts] = React.useState([]);
    const [existDays, setExistDays] = React.useState([]);
    const [sum, setSum] = React.useState(0);
    const [pieData, setPieData] = React.useState([]);
    const [barData, setBarData] = React.useState([]);
    const equalityFn = (value, memoizedValue) => value === memoizedValue;
    const receipts = useSelector(state => state.receipt.receipts, equalityFn);
    const {targetMonth} = useSelector(state => state.targetMonth);
    const categories = useSelector(state => state.category.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(targetMonth === '') {
                let now = new Date();
                let dateStr = Moment.getDateString(now, 'YYYY-MM-DD');
                dispatch(updatetTargetMonth({targetMonth: dateStr}));
            }
        });
        return unsubscribe;

    }, [navigation]);

    useEffect(() => {
        setMonthReceiptList();
    }, [targetMonth, receipts]);

    useEffect(() => {
        updateCalender();
    }, [monthReceipts]);


    const updateCalender = () => {
        // レシートデータが存在する日付のリストを取得
        setExistDays(monthReceipts.map(m => Moment.getDateString(m.createdAt, 'YYYY-MM-DD'))
            .filter((x, i, self) => { return self.indexOf(x) === i;}));
        if(monthReceipts.length !== 0) {
            // 月別レシートの合計金額を取得
            setSum(monthReceipts.map(m => Number(m.sum) ?? 0).reduce((p, c) => p + c));
        } else {
            setSum(0);
        }
    }

    const setMonthReceiptList = () => {
        let r = receipts;
        let mrs = r.filter(r => Moment.getDateString(r.createdAt, 'YYYY-MM') === Moment.getDateString(targetMonth, 'YYYY-MM'));        
        setMonthReceipts(mrs);

        // カテゴリ別集計データを作成
        setPieData(getPieData(mrs));

        let year = targetMonth.substr(0, 4);
        let month = targetMonth.substr(5, 2);
        let lastDate = new Date(year, month, 0).getDate();
        
        let bardata = [];
        // 当月の末日までループ
        for(let i = 1; i <= lastDate; i++) {
            let sumOfDay = 0;
            for(let r of mrs) {
                if(Moment.getDateString(r.createdAt, 'D') == i) {
                    sumOfDay += r.sum;
                }
            }
            bardata.push({
                date: i,
                sum: sumOfDay
            })
        }
        setBarData(bardata);
    }

    /**
     * カテゴリ別集計データ取得
     */
    const getPieData = (mrs) => {
        let piedata = [];
        // カテゴリ別合計
        for(let c of categories) {
            let categorySum = 0;
            for(let r of mrs) {
                // カテゴリーIDがなければ（旧データの場合 0:未設定）
                if(r.categoryId === undefined || r.categoryId === null) {
                    continue;
                }
                if(r.categoryId  === c.id) {
                    categorySum += r.sum;
                }
            }
            piedata.push({
                name: c.name,
                population: categorySum,
                color: c.color,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            });
        }

        // カテゴリ未設定合計
        let categorySum = 0;
        for(let r of mrs) {
            if(r.categoryId === undefined || r.categoryId === null) {
                categorySum += r.sum;
            }
        }
        piedata.push({
            name: '未設定',
            population: categorySum,
            color: '#B0BEC5',
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        });

        return piedata;
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {setRefreshing(false)}, 1000)
    }, []);

    /**
     * 月変更
     */
    const changeMonth = (month) => {
        dispatch(updatetTargetMonth({targetMonth: month}));
    }

    /**
     * ファイル出力
     */
    const exportFile = async () => {
        // 日本語文字が含まれるとファイル書き込みのタイミングでエラーになるみたい
        let fileName = 'okaimono-db-monthly' + Moment.getDateString(new Date(), 'yyyyMMDDHHmmss');
        let fileUri = FileSystem.documentDirectory + fileName + ".csv";
        let txtFile = convertToCSV(monthReceipts);
        await FileSystem.writeAsStringAsync( fileUri, txtFile, { encoding: FileSystem.EncodingType.UTF8 })
        await Sharing.shareAsync(fileUri)
        await FileSystem.deleteAsync(fileUri)
    }

    /**
     * JSONオブジェクトをCSVに変換
     */
    const convertToCSV = (obj) => {
        let objArray = obj.map(o => ([
            o.title,
            o.sum,
            Moment.getDateString(o.createdAt,'YYYY/MM/DD')
        ]));
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let headerLine = 'タイトル, 合計金額(円), 日付';
        str += headerLine + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }

    // react-native-calendarsの表示設定
    LocaleConfig.locales['ja'] = {
        // 月の名前(フル)
        monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        // 月の名前(短縮表記)
        monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        // 曜日の名前(フル)
        dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
        // 曜日の名前(短縮表記)
        dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    };
    
    // デフォルトの表示設定を、今設定した`ja`に切り替え
    LocaleConfig.defaultLocale = 'ja';

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SumPriceMonthlyItem sumStr={sum ?? 0} />
            <ScrollView style={{marginBottom:70}}>
                <Calendar
                    theme={{
                        arrowColor: '#ee8572',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
                        todayTextColor: '#ee8572',
                    }}

                    style={{width: "100%", height:360}}
                    monthFormat={'yyyy年 MM月'}
                    onDayPress={(day) => {navigation.navigate("Receipt", {targetDate: day})}}
                    onMonthChange={(month) => {changeMonth(month['dateString'])}}
                    enableSwipeMonths={true}
                    markedDates={
                        existDays.reduce((newObj, ed) => {
                            newObj[ed] = {selected: true, selectedColor: '#FFA726'}
                            return newObj;
                        },{})
                    }
                />
                <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
                    <View style={{alignItems: 'center', marginTop:10}}>
                        <Button
                            containerStyle={{}}
                            buttonStyle={{height:45, backgroundColor:"#347474", borderRadius:10, paddingLeft:30, paddingRight:30}}
                            onPress={() => {navigation.navigate("Receipt", {targetMonth: targetMonth})}}
                            icon={
                                <AntDesign name="profile" size={16} color="#FFF" />
                            }
                            title="月別レシート"
                        />
                    </View>
                    <View style={{alignItems: 'center', marginTop:10}}>
                        <Button
                            containerStyle={{}}
                            buttonStyle={{height:45, backgroundColor:"#63b7af", borderRadius:10, paddingLeft:30, paddingRight:30}}
                            onPress={() => {exportFile()}}            
                            icon={
                                <AntDesign name="download" size={16} color="#FFF" />
                            }
                            title="月別CSV出力"
                        />
                    </View>
                </View>
                <View style={styles.chartArea}>
                    <Text style={styles.chartTitle}>日別支出額</Text>
                    {
                        sum !== 0 &&
                        <ScrollView
                            style={{marginTop:10}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <BarChart
                                data={{
                                    labels: barData.map(d => d.date + '日'),
                                    datasets: [{
                                        data: barData.map(d => d.sum)
                                    }],
                                }}
                                width={Dimensions.get("window").width * 2.5}
                                height={200}
                                yAxisSuffix={"円"}
                                fromZero={true}
                                withVerticalLabels={true}
                                withHorizontalLabels={true}
                                withScrollableDot={true}
                                chartConfig={{
                                    backgroundGradientFrom: "#63b7af",
                                    backgroundGradientFromOpacity: 0,
                                    backgroundGradientTo: "#63b7af",
                                    backgroundGradientToOpacity: 0,
                                    fillShadowGradient: "#63b7af",
                                    fillShadowGradientOpacity: 1,
                                    decimalPlaces: 0,
                                    data: [
                                        {
                                            data: barData.map(d => d.sum),
                                        }
                                    ],
                                    color: (opacity = 1) => `rgba(99, 183, 175, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    barPercentage: 0.5,
                                    
                                }}
                                showBarTops={true}
                                style={{}}
                            />
                        </ScrollView> ||
                        <View style={{height:200, justifyContent:"center", alignItems:"center"}}>
                            <Text style={{color:"#35495e"}}>現在月はまだ支出登録がありません。</Text>
                        </View>
                    }
                </View>
                <View style={styles.chartArea}>
                    <Text style={styles.chartTitle}>カテゴリ別支出割合</Text>
                    <PieChart
                        data={pieData}
                        width={windowWidth * 0.99}
                        height={windowHeight/4}
                        chartConfig={chartConfig}
                        accessor="population"
                        bgColor="transparent"
                        paddingLeft={10}
                        // absolute
                    />
                </View>

            </ScrollView>
            <View style={{position:"absolute", bottom:15}}>
                <AdMobBannerItem/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    chartArea: {
        marginTop:10,
        backgroundColor:"#FFF"
    },
    chartTitle: {
        color:"#35495e",
        fontSize:16,
        fontWeight:"bold",
        marginTop:10,
        marginLeft:10,
    }
});
