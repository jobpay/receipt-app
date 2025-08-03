import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

// Screens
import CameraScreen from "../screens/CameraScreen";
import ReceiptListScreen from "../screens/ReceiptListScreen";
import DetailScreen from "../screens/DetailScreen";
import MonthlyScreen from "../screens/MonthlyScreen";
import SettingScreen from "../screens/SettingScreen";
import ContactScreen from "../screens/ContactScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyle = {
    backgroundColor: '#ee8572',
    borderBottomColor: "#ee8572",
    shadowOpacity: 0
};

const headerTitleStyle = { 
    color: '#FFF' 
};

const CameraStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Camera"
                component={CameraScreen}
                options={{
                    title: 'レシート撮影',
                    headerStyle,
                    headerTitleStyle,
                }}
            />
        </Stack.Navigator>
    );
};

const SettingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    title: '設定',
                    headerStyle,
                    headerTitleStyle,
                }}
            />
            <Stack.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    title: 'お問い合わせ',
                    headerStyle,
                    headerTitleStyle,
                }}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    title: 'カテゴリー',
                    headerStyle,
                    headerTitleStyle,
                }}
            />
        </Stack.Navigator>
    );
};

const MonthlyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Monthly"
                component={MonthlyScreen}
                options={{
                    title: '月間',
                    headerStyle,
                    headerTitleStyle,
                }}
            />
            <Stack.Screen
                name="Receipt"
                component={ReceiptListScreen}
                options={{
                    title: 'レシート一覧',
                    headerStyle,
                    headerTitleStyle,
                }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    title: 'レシート詳細',
                    headerStyle,
                    headerTitleStyle,
                }}
            />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    const tabBarOptions = {
        activeTintColor: "#ee8572",
        inactiveTintColor: "#999",
    };

    const renderCameraIcon = ({ color, size }) => (
        <View style={styles.cameraTabContainer}>
            <AntDesign 
                name="camera" 
                style={styles.cameraIcon} 
                color="#FFF" 
                size={36} 
            />
        </View>
    );

    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={tabBarOptions}>
                <Tab.Screen 
                    name="月間" 
                    component={MonthlyStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="carryout" color={color} size={size} />
                        )
                    }} 
                />
                <Tab.Screen 
                    name="撮影" 
                    component={CameraStack}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: renderCameraIcon
                    }} 
                />
                <Tab.Screen 
                    name="設定" 
                    component={SettingStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="setting" color={color} size={size} />
                        )
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    cameraTabContainer: {
        width: 60, 
        height: 60, 
        marginTop: 10, 
        backgroundColor: "#ee8572", 
        borderRadius: 100
    },
    cameraIcon: {
        position: "absolute", 
        top: 10, 
        left: 12
    }
});

export default AppNavigator;
