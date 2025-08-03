import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from "@expo/vector-icons"

/**
 * 合計金額表示コンポーネント（通常版）
 */
export const SumPriceItem = ({sumStr}) => {
    return (
        <View style={styles.sumArea}>
            <Text style={styles.sumText}>合計金額</Text>
            <Text style={styles.sumText}>
                ¥{sumStr.toLocaleString()}
            </Text>
        </View>
    );
};

/**
 * 合計金額表示コンポーネント（月別表示版）
 */
export const SumPriceMonthlyItem = ({sumStr}) => {
    return (
        <View style={styles.sumAreaMonthly}>
            <View style={styles.sumAreaInner}>
                <Text style={[styles.sumTextMonthly, {marginTop:2}]}>合計金額</Text>
                <Text style={[styles.sumTextMonthly,{marginLeft:20}]}>
                    ¥{sumStr.toLocaleString()}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // 通常版のスタイル
    sumArea: {
        marginLeft:40,
        marginRight:40,
        marginTop:10, 
        marginBottom:10, 
        flexDirection:"row", 
        justifyContent:"space-around"
    },
    sumText: {
        color:"#555",
        fontSize:30, 
        fontWeight:"bold"
    },
    
    // 月別表示版のスタイル
    sumAreaMonthly: {
        backgroundColor:"#35495e",
        paddingTop:8, 
        paddingBottom:8, 
        alignItems:"center"
    },
    sumAreaInner: {
        flexDirection:"row",
        alignItems:"center"
    },
    sumTextMonthly: {
        color:"#FFF",
        fontSize:18, 
        fontWeight:"bold",
    },
}); 