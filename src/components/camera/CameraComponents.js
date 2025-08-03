import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import { AdMobBannerItem } from '../ads/AdComponents';

/**
 * カメラ撮影コンポーネント
 */
export const CameraItem = ({ type, setCamera, snap }) => {
    return (
        <Camera 
            style={{ flex: 1 }} 
            type={type} 
            ref={(ref) => { setCamera(ref); }}
        >
            <View style={styles.cameraView}>
                <View style={styles.cameraTextArea}>
                    <Text style={styles.cameraText}>
                        レシートを正面に配置して明るい場所で撮影してください
                    </Text>
                </View>
                <TouchableOpacity 
                    onPress={() => { snap(); }} 
                    style={styles.snap}
                >
                    <View style={styles.scanBtn}>
                        <AntDesign 
                            name="camerao" 
                            color="#FFF" 
                            style={styles.cameraIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <AdMobBannerItem />
        </Camera>
    );
};

const styles = StyleSheet.create({
    cameraView: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    cameraTextArea: {
        marginTop: 20, 
        width: "100%", 
        height: 40, 
        alignItems: "center"
    },
    cameraText: {
        color: "#FFFFFF", 
        width: "90%", 
        paddingTop: 10, 
        paddingBottom: 10, 
        textAlign: "center", 
        fontSize: 14, 
        fontWeight: "bold", 
        backgroundColor: "rgba(0,0,0,0.5)", 
        borderRadius: 10, 
        overflow: "hidden"
    },
    snap: {
        position: "absolute", 
        bottom: 40, 
        left: "42%"
    },
    scanBtn: {
        width: 68,
        height: 68,
        borderRadius: 100,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    cameraIcon: {
        position: "absolute", 
        top: 12, 
        left: 14, 
        fontSize: 40
    }
}); 