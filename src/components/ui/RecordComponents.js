import React from "react";
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';

/**
 * レコード追加コンポーネント
 */
export const AddRecordItem = ({setNewGoods, setNewPrice, addRecord}) => {
    return (
        <View>
            <Input
                label="品物"
                containerStyle={{width: "100%"}}                
                onChangeText={text => setNewGoods(text)}
            />
            <Input
                label="料金"
                containerStyle={{width: "100%"}}                
                onChangeText={text => setNewPrice(text)}
                keyboardType="numeric"
            />
            <Button
                buttonStyle={{backgroundColor:"#35495e"}}
                onPress={addRecord}
                title="登録する"
            />
        </View>
    );
};

/**
 * レコード更新コンポーネント
 */
export const UpdateRecordItem = ({setUpdGoods, setUpdPrice, updateRecord, goods, price}) => {
    return (
        <View>
            <Input
                label="品物"
                containerStyle={{width: "100%"}}
                value={goods}
                onChangeText={text => setUpdGoods(text)}
            />
            <Input
                label="料金"
                containerStyle={{width: "100%"}}
                value={price}                
                onChangeText={text => setUpdPrice(text)}
            />
            <Button
                buttonStyle={{backgroundColor:"#000"}}
                onPress={updateRecord}
                title="更新する"
            />
        </View>
    );
}; 