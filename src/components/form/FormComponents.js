import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

/**
 * カテゴリー編集コンポーネント
 */
export const CategoryEditItem = ({ selectCategory, setCategoryId, categoryId }) => {
    const categories = useSelector(state => state.category.categories);

    useEffect(() => {
        // 初期化処理があればここに記述
    }, []);

    const renderPicker = () => {
        if (categories.length === 0) {
            return (
                <View style={styles.noCategoryContainer}>
                    <Text style={styles.noCategoryText}>
                        カテゴリが未作成です。
                    </Text>
                    <Text style={styles.noCategoryText}>
                        設定画面から作成してください。
                    </Text>
                </View>
            );
        }

        return (
            <Picker
                selectedValue={categoryId}
                onValueChange={(value) => setCategoryId(value)}
            >
                <Picker.Item label="選択してください" value={null} />
                {categories.map(c => (
                    <Picker.Item 
                        key={c.id}
                        label={c.name} 
                        value={c.id} 
                    />
                ))}
            </Picker>
        );
    };

    return (
        <View>
            {renderPicker()}
            <Button
                buttonStyle={styles.closeButton}
                onPress={selectCategory}
                title="閉じる"
            />
        </View>
    );
};

const styles = {
    noCategoryContainer: {
        height: 80, 
        justifyContent: "center", 
        alignItems: "center"
    },
    noCategoryText: {
        fontSize: 16, 
        marginBottom: 8
    },
    closeButton: {
        backgroundColor: "#000"
    }
}; 