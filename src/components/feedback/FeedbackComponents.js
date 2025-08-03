import React from "react";
import { Overlay } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

/**
 * オーバーレイコンポーネント
 */
export const OverlayItem = ({ isVisible, onBackdropPress, container }) => {
    return (
        <Overlay 
            isVisible={isVisible} 
            onBackdropPress={onBackdropPress}
            overlayStyle={styles.overlay}
        >
            {container}
        </Overlay>
    );
};

/**
 * スピナーコンポーネント
 */
export const SpinnerItem = ({ spinner, text }) => {
    return (
        <Spinner
            visible={spinner}
            textContent={text}
            textStyle={styles.spinnerText}
            overlayColor="rgba(0,0,0,0.5)"
        />
    );
};

/**
 * トーストコンポーネント
 */
export const ToastItem = ({ text, visible }) => {
    return (
        <Toast
            visible={visible}
            position={400}
            shadow={false}
            opacity={0.8}
            animation={false}
            hideOnPress={true}
        >
            {text}
        </Toast>
    );
};

const styles = {
    overlay: {
        width: "80%", 
        borderRadius: 10
    },
    spinnerText: { 
        color: "#fff" 
    }
}; 