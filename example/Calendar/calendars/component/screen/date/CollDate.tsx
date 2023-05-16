import * as React from 'react';
import { Text, View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import g from '../../../../style/Global.style';
import { formetDate, setDateBorder } from '../../../utils/utils';
import { collDateType } from '../../../../type/compoent/day';
import { sizeType, onLabelData } from '../../../../Calendars.d';
import OverDateBtn from './btn/OverDateBtn';
import NowDateBtn from './btn/NowDateBtn';
import DateBtn from './btn/DateBtn';

interface DateProps {
    collDate : collDateType;
    labelList : onLabelData;
    lastWeek : boolean;
    lastDate : boolean;
    options : dateOptionType;
}

const CollDate = ({collDate, options, lastWeek, lastDate, labelList}: DateProps) => {
    let {date, otherDate} = collDate;
    let {touchableOpacityStyle,
        toDayBorderWidth,
        dateBorderViewStyle,
        dateBackgroundViewStyle,
        enableLabels,
        toDayBackgroundViewStyle,
        toDayBorderViewStyle,
        dateTextStyle,
        toDayTextStyle,
        selectDateColor,
        size,
    } = options;

    let border = {};
    let nowFormmetDate = formetDate(new Date());
    let onLabel = ",";
    let initDate = date.getDate().toString();
    let fommetDate = formetDate(date);
    let btnStyle = [g.row,g.center,touchableOpacityStyle];
    let nowDateBorder = setDateBorder(size, toDayBorderWidth, "now");
    let dateBorder = setDateBorder();

    border = s.border;

    if(lastWeek){
        border = s.borderRight;
    }

    if(lastDate){
        border = s.borderBottom;
    }

    if(lastWeek && lastDate){
        border = {};
    }

    
    labelList.some((data,num)=>{
        if(data.date === fommetDate){
            data.onLabel.forEach((label)=>{
                onLabel += label+",";
            })
        }
    });

    if(otherDate){
        return <OverDateBtn text={initDate} enableLabels={enableLabels} styles={{
            dateBorder: dateBorderViewStyle,
            defaultBorder : dateBorder.borderViewStyle,
            dateBackground : dateBackgroundViewStyle,
        }}/>
    }

    if(nowFormmetDate === fommetDate){
        return <NowDateBtn text={initDate} enableLabels={enableLabels} styles={{
            dateBorder: toDayBorderViewStyle,
            defaultBorder : nowDateBorder.borderViewStyle,
            toDayBackground : toDayBackgroundViewStyle,
            dateText : dateTextStyle,
            toDayText : toDayTextStyle,
            color : "" === initDate.toString() ? selectDateColor : "#000",
        }} />
    }

    return (
        <DateBtn text={initDate} enableLabels={enableLabels} styles={{
            dateBorder: dateBorderViewStyle,
            defaultBorder : dateBorder.borderViewStyle,
            dateBackground : dateBackgroundViewStyle,
            dateText : dateTextStyle,
            color : "" === initDate.toString() ? selectDateColor : "#000"
        }} />
    );
};

export default CollDate;

const s = StyleSheet.create({
    border : {
        borderRightWidth:1,
        borderRightColor:'#EEEEEE',
        borderBottomWidth:1,
        borderBottomColor:'#EEEEEE'
    },
    borderBottom : {
        borderBottomWidth:1,
        borderBottomColor:'#EEEEEE'
    },
    borderRight : {
        borderRightWidth:1,
        borderRightColor:'#EEEEEE'
    },
});
