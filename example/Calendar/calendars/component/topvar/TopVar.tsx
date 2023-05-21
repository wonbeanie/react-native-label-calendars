import React, {useContext, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import g from '../../../style/Global.style';
import { OptionContext } from '../../../context/OptionContext';
import { sameDate } from '../../utils/utils';
import { ArrowButtonType } from './ArrowButton';
import DefaultButton from './DefaultButton';

interface TopVarProps {
    dataDate : Date;
    nowDate : Date;
    prevMonth : ()=>void;
    nextMonth : ()=>void;
    formatTitle : ()=>string;
}

const TopVar = ({dataDate, nowDate, prevMonth, nextMonth, formatTitle}: TopVarProps) => {
    const option = useContext(OptionContext);
    const sameDateCheck = sameDate(dataDate, nowDate);
    
    return (
        <View style={[g.row,g.center]}>

            <DefaultButton direction={ArrowButtonType.PREV} onPress={prevMonth} sameDateCheck={sameDateCheck}/>

            <View style={[g.row,g.center, s.titleContainer, option.titleViewStyle]}>
                <Text style={[s.text, option.titleStyle]}>{formatTitle()}</Text>
            </View>

            <DefaultButton direction={ArrowButtonType.NEXT} onPress={nextMonth} sameDateCheck={sameDateCheck}/>

        </View>
    );
};

export default TopVar;

const s = StyleSheet.create({
    titleContainer : {
        flex:5,
        padding:10
    },
    text : {
        color:'#000000',
        fontWeight:'bold',
        fontSize:20
    }
});
