import * as React from 'react';
import { Text, View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import g from '../../../../style/Global.style';
import { formetDate, setDateBorder } from '../../../utils/utils';
import { collDateType } from '../../../../type/compoent/day';
import { sizeType, onLabelData, labelType } from '../../../../Calendars.d';
import OverDateBtn from './btn/OverDateBtn';
import NowDateBtn from './btn/NowDateBtn';
import DateBtn from './btn/DateBtn';
import { dateOptionType, pressDateType, pressOverDateType } from '../../../../type/compoent/date';

interface DateProps {
    collDate : collDateType;
    labelList : onLabelData;
    lastWeek : boolean;
    lastDate : boolean;
    labels : labelType;
    pressDate : pressDateType;
    pressOverDate : pressOverDateType;
    options : dateOptionType;
    selectDate : string;
}

const CollDate = ({collDate, options, lastWeek, lastDate, labelList, pressDate, pressOverDate, selectDate, labels}: DateProps) => {
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
        size
    } = options;

    let border = {};
    let nowFormetDateText = formetDate(new Date());
    let onLabel = ",";
    let initDate = date.getDate().toString();
    let fometDateText = formetDate(date);
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
        if(data.date === fometDateText){
            data.onLabel.forEach((label)=>{
                onLabel += label+",";
            })
        }
    });

    if(otherDate){
        return <OverDateBtn text={initDate} enableLabels={enableLabels} label={onLabel} labelList={labels} styles={{
            dateBorder: dateBorderViewStyle,
            defaultBorder : dateBorder.borderViewStyle,
            dateBackground : dateBackgroundViewStyle,
            btnStyle : touchableOpacityStyle
        }} onPress={()=>{
            pressOverDate(date);
        }}/>
    }

    if(nowFormetDateText === fometDateText){
        return <NowDateBtn text={initDate} enableLabels={enableLabels} label={onLabel} labelList={labels} styles={{
            dateBorder: toDayBorderViewStyle,
            defaultBorder : nowDateBorder.borderViewStyle,
            toDayBackground : toDayBackgroundViewStyle,
            dateText : dateTextStyle,
            toDayText : toDayTextStyle,
            btnStyle : touchableOpacityStyle,
            color : selectDate === initDate.toString() ? selectDateColor : "#000",
        }} onPress={(e)=>{
            pressDate(initDate, fometDateText)
        }}/>
    }

    return (
        <DateBtn text={initDate} enableLabels={enableLabels} label={onLabel} labelList={labels} styles={{
            dateBorder: dateBorderViewStyle,
            defaultBorder : dateBorder.borderViewStyle,
            dateBackground : dateBackgroundViewStyle,
            dateText : dateTextStyle,
            btnStyle : touchableOpacityStyle,
            color : selectDate === initDate.toString() ? selectDateColor : "#000"
        }} onPress={()=>{
            pressDate(initDate, fometDateText)
        }}/>
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
