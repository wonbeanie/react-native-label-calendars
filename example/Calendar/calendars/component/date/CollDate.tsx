import React from 'react';
import { StyleSheet } from 'react-native';
import { formatDate, setDateBorder } from '../../utils/utils';
import { collDateType } from '../../../type/compoent/day';
import OverDateBtn from './btn/OverDateBtn';
import NowDateBtn from './btn/NowDateBtn';
import DateBtn from './btn/DateBtn';
import { dateOptionType, pressDateType, pressOverDateType } from '../../../type/compoent/date';
import { CalendarsDateContext } from '../../../context/CalendarsDateContext';
import { useContext } from 'react';

interface DateProps {
    collDate : collDateType;
    lastWeek : boolean;
    lastDate : boolean;
}

const CollDate = ({collDate, lastWeek, lastDate}: DateProps) => {
    let {date, otherDate} = collDate;

    const {
        options, labelList, labels,
        pressDate, pressOverDate, selectDate
    } = useContext(CalendarsDateContext);

    const {
        onPressStyle,
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
    let nowFormatDateText = formatDate(new Date());
    let onLabel = ",";
    let initDate = date.getDate().toString();
    let fometDateText = formatDate(date);
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
            btnStyle : onPressStyle
        }} onPress={()=>{
            pressOverDate(date);
        }}/>
    }

    if(nowFormatDateText === fometDateText){
        return <NowDateBtn text={initDate} enableLabels={enableLabels} label={onLabel} labelList={labels} styles={{
            dateBorder: toDayBorderViewStyle,
            defaultBorder : nowDateBorder.borderViewStyle,
            toDayBackground : toDayBackgroundViewStyle,
            dateText : dateTextStyle,
            toDayText : toDayTextStyle,
            btnStyle : onPressStyle,
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
            btnStyle : onPressStyle,
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
