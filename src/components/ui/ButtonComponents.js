import React from "react";
import {StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons"

/**
 * アイコンボタンコンポーネント
 */
export const AntButtonItem = ({btnName, btnColor, parentMethod}) => {
    return (
        <View style={{marginLeft:15, marginRight:15}}>
            <TouchableOpacity onPress={() => {parentMethod()}}>
                <View style={[styles.editBtn, {backgroundColor: btnColor}]}>
                    <AntDesign name={btnName} color="#FFF" 
                    style={{position:"absolute", top: 12, left:12, fontSize: 36}}/>
                </View>
            </TouchableOpacity>
        </View> 
    );
};

/**
 * 閉じるボタンコンポーネント
 */
export const CloseButtonItem = ({setModalVisible}) => {
    return (
        <TouchableOpacity 
            onPress={(visible) => {setModalVisible(!visible);}} 
            style={styles.closeBtnArea}>
            <View style={styles.closeBtn}>
                <AntDesign name="closecircleo" color="#000" style={styles.iconStyle}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // アイコンボタンのスタイル
    editBtn: {
        width:60,
        height:60,
        borderRadius:100,
        shadowColor: "#999",
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
    },
    
    // 閉じるボタンのスタイル
    closeBtnArea: {
        position:"absolute", 
        top:0, 
        right:10
    },
    closeBtn: {
        width:50,
        height:50,
        borderRadius:100,
        backgroundColor:"#FFFFFF"
    },
    iconStyle: {
        position:"absolute", 
        top: 17, 
        left:18, 
        fontSize: 30
    }
}); 