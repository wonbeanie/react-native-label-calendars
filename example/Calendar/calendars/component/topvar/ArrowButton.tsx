import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import g from '../../../style/Global.style';

interface ArrowButtonProps {
    onPress : ()=>void;
    type : ArrowButtonType;
}

const prevImage = require('../../../image/calendar_arrow_left.png');
const nextImage = require('../../../image/calendar_arrow_right.png');

const ArrowButton = ({onPress, type}: ArrowButtonProps) => {

    const typeCheck = () => {
        return type === ArrowButtonType.NEXT;
    }

    return (
        <Pressable style={[g.row,g.center,s.container]} onPress={onPress}>
            <Image source={typeCheck() ? nextImage : prevImage} style={s.image} resizeMode="cover"/>
        </Pressable>
    );
};

export default ArrowButton;

const s = StyleSheet.create({
    container: {
        flex:2.5,
        padding:10
    },
    image : {
        width:20,
        height:20
    }
});

export enum ArrowButtonType {
    PREV,
    NEXT
}