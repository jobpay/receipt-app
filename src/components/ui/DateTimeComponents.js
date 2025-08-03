import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Moment from '../../lib/Moment';

/**
 * 日時表示コンポーネント
 */
export const DateTimeStrItem = ({datetime}) => {
    return (
        <Text>
            {datetime !== null && Moment.getDateString(datetime, 'YYYY年MM月DD日') || 
            Moment.getDateString(new Date(), 'YYYY年MM月DD日')}
        </Text>
    );
};

/**
 * 日時編集コンポーネント
 */
export const DateTimeEditItem = ({createdAt, editCreatedAt, setCreatedAt}) => {
    const changeTime = (event, selectedDate) => {
        let currentDate = selectedDate || new Date();
        setCreatedAt(currentDate);
    }

    return (
        <View>
            <DateTimePicker
                value={createdAt || new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                locale="ja-JP"
                onChange={changeTime}
            />
            <Button
                buttonStyle={{backgroundColor:"#000"}}
                onPress={editCreatedAt}
                title="閉じる"
            />
        </View>
    );
}; 