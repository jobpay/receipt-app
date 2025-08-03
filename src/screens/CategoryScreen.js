import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { AntDesign } from "@expo/vector-icons"

import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategories, deleteCategory } from '../store/actions/category';
import { incrementCategoryId } from '../store/actions/category-id';

/** components */
import { OverlayItem } from '../components/feedback';

const categoryColors = [
    '#90A4AE',
    '#e57373',
    '#F06292',
    '#7986CB',
    '#64B5F6',
    '#4DB6AC',
    '#81C784',
    '#FFB74D',
    '#FF8A65',
    '#A1887F',
];

export default CategoryScreen = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false);
    const [updCategoryId, setUpdCategoryId] = React.useState();
    const [updCategoryText, setUpdCategoryText] = React.useState('');
    const [updCategoryColorCode, setUpdCategoryColorCode] = useState('');

    const [categoryWord, setCategoryWord] = useState('');
    const [categoryColorCode, setCategoryColorCode] = useState('');

    const {categoryId} = useSelector(state => state.categoryId);
    const categories = useSelector(state => state.category.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "カテゴリ設定",
            headerTintColor:"#FFF",
        });
    }, [navigation]);

    useEffect(() => {
    }, [categoryWord]);

    const onSubmit = () => {
        let category = {
            id: categoryId, 
            name: categoryWord,
            color: categoryColorCode
        }
        dispatch(addCategory({category: category}));
        dispatch(incrementCategoryId({categoryId: categoryId}));
        setCategoryWord('');
    }

    const onDelete = (categoryId) => {
        dispatch(deleteCategory({categoryId: categoryId}));
    }

    /**
     * カテゴリ名更新ポップ表示切り替え
     */    
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    /**
     * カテゴリ編集モーダルを開く
     */
    const openCategoryModal = (category) => {
        setUpdCategoryId(category['id']);
        setUpdCategoryText(category['name']);
        setUpdCategoryColorCode(category['color']);
        setVisible(!visible);
    }

    const editCategory = () => {
        let updCategories = [
            ...categories.filter(r => r.id !== updCategoryId),
            {
                id: updCategoryId, 
                name: updCategoryText,
                color: updCategoryColorCode
            }
        ]
        .sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

        dispatch(updateCategories({categories: updCategories}));
        setVisible(!visible);
    }

    return (
        <SafeAreaView style={styles.container}>
            <OverlayItem
                isVisible={visible} 
                onBackdropPress={toggleOverlay}
                container= { 
                    <View>
                        <Input
                            label="カテゴリ名"
                            containerStyle={{width: "100%"}}                
                            onChangeText={text => setUpdCategoryText(text)}
                            value={updCategoryText}
                        />
                        <Text style={[styles.categoryColorTitle, {marginLeft:6}]}>設定色</Text>
                        <View style={styles.categoryColorArea}>
                            <View style={styles.categoryColorAreaRow}>
                                {
                                    categoryColors.map((c, i) => (
                                        i <= 4 && 
                                        <TouchableOpacity 
                                            style={[
                                                styles.colorPanel, 
                                                {backgroundColor:c},
                                                updCategoryColorCode === c && styles.activeColor
                                            ]}
                                            onPress={() => {setUpdCategoryColorCode(c)}}
                                        />
                                    ))
                                }
                            </View>
                            <View style={styles.categoryColorAreaRow}>
                                {
                                    categoryColors.map((c, i) => (
                                        i > 4 && 
                                        <TouchableOpacity 
                                            style={[
                                                styles.colorPanel, 
                                                {backgroundColor:c},
                                                updCategoryColorCode === c && styles.activeColor
                                            ]}
                                            onPress={() => {setUpdCategoryColorCode(c)}}
                                        />
                                    ))
                                }
                            </View>
                        </View>
                        <Button
                            buttonStyle={{backgroundColor:"#35495e"}}
                            onPress={editCategory}
                            title="更新する"
                        />
                    </View>
                }
            />
            <View style={{ alignItems: "center"}}>
                <View style={styles.contactText}>
                    <Text style={styles.infoTxt}>この画面で作成したカテゴリをレシートに設定することで、カテゴリ別支出割合を確認できます。</Text>
                </View>
                <Input
                    label="カテゴリ名"
                    containerStyle={styles.inputContainer}
                    onChangeText={value => setCategoryWord(value)}
                />
                <Text style={[styles.categoryColorTitle, {marginLeft:"15%"}]}>設定色</Text>
                <View style={styles.categoryColorArea}>
                    <View style={styles.categoryColorAreaRow}>
                        {
                            categoryColors.map((c, i) => (
                                i <= 4 && 
                                <TouchableOpacity 
                                    style={[
                                        styles.colorPanel, 
                                        {backgroundColor:c},
                                        categoryColorCode === c && styles.activeColor
                                    ]}
                                    onPress={() => {setCategoryColorCode(c)}}
                                />
                            ))
                        }
                    </View>
                    <View style={styles.categoryColorAreaRow}>
                        {
                            categoryColors.map((c, i) => (
                                i > 4 && 
                                <TouchableOpacity 
                                    style={[
                                        styles.colorPanel, 
                                        {backgroundColor:c},
                                        categoryColorCode === c && styles.activeColor
                                    ]}
                                    onPress={() => {setCategoryColorCode(c)}}
                                />
                            ))
                        }
                    </View>
                </View>
            </View>
            <View style={{alignItems: 'center'}}>
            <Button
                containerStyle={{width:"93%"}}
                buttonStyle={{height:45, backgroundColor:"#347474", borderRadius:30}}
                onPress={() => onSubmit()}
                disabled={!categoryWord || !categoryColorCode}
                title="登録する"
            />
            </View>
            <View>
                <Text style={styles.categoryListTitle}>カテゴリ一覧</Text>
                <ScrollView style={{height:"100%"}}>       
                    <FlatList
                        style={{height:"100%", width:"100%", backgroundColor:"#FFF"}}
                        data={categories}
                        renderItem={({item}) => (
                            <TouchableOpacity 
                                style={styles.listItemView}
                                onPress={() => {openCategoryModal(item)}}
                            >
                                <View style={{justifyContent:"flex-start", flexDirection:"row"}}>
                                    <View style={[styles.listItemColor, {backgroundColor: item['color']}]}/>
                                    <Text style={styles.listItemTitle}>{item['name']}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.deleteIcon}
                                    onPress={() => {onDelete(item['id'])}}
                                >
                                    <AntDesign name="delete" size={24} color="#777" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
            </View>
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
    infoTxt: {
        lineHeight:20
    },
    listItemView: {
        width:"100%", 
        flexDirection:"row", 
        justifyContent:"space-between",
        height:42,
        borderBottomWidth:0.5,
        borderBottomColor:"#DDD"
    },
    listItemTitle: {
        marginTop:12,
        marginLeft:10, 
        fontSize:16
    },
    listItemColor: {
        width:40,
        height:"100%"
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
    categoryListTitle: {
        fontSize:16,
        marginLeft:16,
        marginTop:15,
        marginBottom:15,
        color:"#777",
        fontWeight:"500"
    },
    deleteIcon: {
        marginTop:8, 
        marginRight:10
    },
    categoryColorTitle: {
        width:"100%",
        color:"#86939E",
        fontSize:16,
        fontWeight:"bold",
        textAlign:"left"
    },
    categoryColorArea:{
        width:"100%",
        marginTop:10,
        marginBottom:10,
    },
    categoryColorAreaRow:{
        flexDirection:"row",
        justifyContent:"center",

    },
    colorPanel:{
        width:50,
        height:50,
        margin:5
    },
    activeColor: {
        borderWidth:2,
        borderColor:"#f44336"
    }
});
