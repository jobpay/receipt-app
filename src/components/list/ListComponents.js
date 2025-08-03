import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { ListItem } from 'react-native-elements';
import Moment from 'moment';
import Swipeout from 'react-native-swipeout';

/**
 * 商品リストコンポーネント
 */
export const GoodsItemList = ({ shoot, delRecord, edit }) => {
    const renderItem = (item, index) => {
        const isEven = index % 2 === 0;
        
        return (
            <TouchableOpacity
                key={index}
                onPress={() => { edit(item); }} 
                style={[isEven ? styles.odd : styles.even, styles.itemContainer]}
            >
                <View style={styles.itemNameContainer}>
                    <Text style={styles.itemText}>
                        {item[0]}
                    </Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>
                        {item[1]}
                    </Text>
                    <Text style={styles.currencyText}>円</Text>
                </View>
                <TouchableOpacity onPress={() => { delRecord(item[2]); }}>
                    <View style={styles.deleteButton}>
                        <AntDesign 
                            name="delete" 
                            color="#000" 
                            style={styles.deleteIcon}
                        />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    const renderNoRecord = () => (
        <View style={styles.noRecordContainer}>
            <Text style={styles.noRecordText}>
                <AntDesign name="exclamationcircleo" size={18} color="#666" />
                お買い物データを登録してください。
            </Text>
        </View>
    );

    return (
        <ScrollView style={styles.resultArea}>
            {shoot.length !== 0 
                ? shoot.map(renderItem)
                : renderNoRecord()
            }
        </ScrollView>
    );
};

/**
 * スワイプリストアイテムコンポーネント
 */
export const SwipListItem = ({ navigation, l, i, delFirst }) => {
    const swipeoutConfig = {
        right: [
            {
                text: (
                    <AntDesign 
                        name="delete" 
                        color="#FFF" 
                        style={styles.deleteIcon}
                    />
                ),
                backgroundColor: "red",
                close: true,
                onPress: () => { delFirst(l); },
            }
        ]
    };

    const handlePress = () => {
        navigation.navigate("Detail", { receipt: l });
    };

    return (
        <Swipeout 
            key={i.toString()}
            style={styles.swipeoutContainer}
            {...swipeoutConfig}
        >
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.container}>
                    <View style={styles.leftContent}>
                        <View style={styles.titleContainer}>
                            <AntDesign 
                                name="profile" 
                                color="#333" 
                                style={styles.profileIcon}
                            />
                            <ListItem.Title style={styles.titleText}>
                                {l.title}
                            </ListItem.Title>
                        </View>
                        <Text style={styles.dateText}>
                            {Moment(l.createdAt).format('YYYY年MM月DD日').toString()}
                        </Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.sumText}>
                            ¥ {l.sum.toLocaleString()}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
};

const styles = StyleSheet.create({
    // GoodsItemList styles
    resultArea: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row', 
        height: 40, 
        paddingTop: 12, 
        paddingLeft: 20
    },
    itemNameContainer: {
        width: "60%"
    },
    itemText: {
        fontSize: 14
    },
    priceContainer: {
        width: "25%", 
        flexDirection: 'row'
    },
    priceText: {
        fontSize: 14, 
        textAlign: "right", 
        width: "70%"
    },
    currencyText: {
        fontSize: 14
    },
    deleteButton: {
        width: 30,
        height: 30,
        marginLeft: 20
    },
    deleteIcon: {
        fontSize: 20
    },
    odd: {
        backgroundColor: "#EEE"
    },
    even: {
        backgroundColor: "#FFF"
    },
    noRecordContainer: {
        flexDirection: 'row', 
        marginTop: 20
    },
    noRecordText: {
        width: "100%",
        textAlign: "center",
        fontSize: 18,
        color: "#666"
    },
    
    // SwipListItem styles
    swipeoutContainer: {
        backgroundColor: "#FFF", 
        height: 60
    },
    container: {
        flexDirection: "row", 
        height: 60, 
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderBottomColor: "#CCC"
    },
    leftContent: {
        marginTop: 10, 
        marginLeft: 12
    },
    titleContainer: {
        flexDirection: "row",
        marginBottom: 5
    },
    profileIcon: {
        fontSize: 18, 
        marginRight: 5
    },
    titleText: {
        fontSize: 18
    },
    dateText: {
        fontSize: 14,
        color: "#666"
    },
    rightContent: {
        justifyContent: "center"
    },
    sumText: {
        marginRight: 15,
        fontSize: 25,
        color: "#333"
    }
}); 