import * as React from 'react';
import { Text, View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import g from '../../../../style/Global.style';

interface ButtonProps {
    onPress : any;
    btnStyle : ViewStyle;
    children : React.ReactNode;
}

const Button = ({onPress, btnStyle, children}: ButtonProps) => {

    const onPressBtn = (e : any) => {
        onPress();
    }

    return (
        <Pressable style={[g.row,g.center, btnStyle]} onPress={onPressBtn}>
            {
                children
            }
        </Pressable>
    );
};

export default Button;