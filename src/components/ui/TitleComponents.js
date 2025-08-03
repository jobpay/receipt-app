import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { Input, Button } from 'react-native-elements';

/**
 * タイトル表示コンポーネント
 */
export const TitleItem = ({toggleOverlayTitle, title}) => {
    return (
        <TouchableOpacity style={{width:"100%"}} onPress={() => {toggleOverlayTitle();}}>
            <Text style={styles.titleText}>{title}</Text>                            
        </TouchableOpacity>
    );
};

/**
 * タイトル編集コンポーネント
 */
export const AddTitleItem = ({setTitle, addTitle, title}) => {
    return (
        <View>
            <Input
                label="タイトル"
                containerStyle={{width: "100%"}}                
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <Button
                title="閉じる"
                buttonStyle={{backgroundColor:"#000"}}
                onPress={addTitle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize:24, 
        fontWeight:"bold", 
        textAlign:"left", 
        marginTop:10,
        marginLeft:20, 
        marginBottom:5, 
    }
}); 