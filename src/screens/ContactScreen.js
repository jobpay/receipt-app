import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Picker, Platform } from 'react-native';
import { WebView } from 'react-native-webview';


import { useDispatch, useSelector } from 'react-redux';

export default ContactScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "お問い合わせ",
            headerTintColor:"#FFF",
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <WebView source={{ uri: 'https://expo.io' }} style={{ marginTop: 20 }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contactText: {
        margin:20, 
        padding:15, 
        backgroundColor:"#FFF", 
        borderWidth:1,
        borderColor:"#CCC",
        borderRadius:15,
    },
    listItemView: {
        width:"100%", 
        flexDirection:"row", 
        justifyContent:"space-between",
        height:30
    },
    listItemTitle: {
        marginTop:6, 
        fontSize:18
    },
    inputContainer: {
        width: "90%"
    },
    categoryTitle: {
        width:"100%",
        color:"#86939E",
        marginLeft:"15%",
        fontSize:16,
        fontWeight:"bold",
        textAlign:"left"
    },
    categoryArea:{
        width:"90%",
        height:40,
        justifyContent:"center",
        paddingLeft:10
    },
    categoryText: {
        width:"100%",
        fontSize:18,
        textAlign:"left",
        color:"#666",
        fontWeight:"400"
    },
    infoTxt: {
        lineHeight:20
    }
});
