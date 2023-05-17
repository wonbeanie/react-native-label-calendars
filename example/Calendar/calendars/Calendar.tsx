import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import g from '../style/Global.style';
import { useState, useEffect, useLayoutEffect } from 'react';
import { labelType, sizeType, dataDateType, nowDateType, onLabelData, defaultOptionType } from '../Calendars.d';
import { RowDay } from './component/screen/day';
import { CalendarsDate } from './component/screen/date';
import { pressDateType, pressOverDateType } from '../type/compoent/date';
import { formetDay } from './utils/utils';

export default function Calendar({size, labels, option, onLabelData, ...props} : propsType){
    const [dateData, setDateData] = useState<dateDataType>([]);
    const [year, setYear] = useState<string>('2021');
    const [month, setMonth] = useState<string>('1');
    const [dataDate, setDataDate] = useState<Date>(new Date());
    const [nowDate, setNowDate] = useState<Date>(new Date());
    const [selectDate, setSelectDate] = useState<string>('');
    let dayData = option.weekLangFormat.length > 7 ? option.weekLangFormat.splice(0,7) : option.weekLangFormat;

    //didmount
    useLayoutEffect(()=>{
        getDates(props.dataDate);
    },[props.dataDate]);

    const getDates = (dataDate : dataDateType)=>{
        if(!dataDate){
            dataDate = new Date();
        }

        const resultDate = formetDateList(dataDate);

        setDateData(resultDate);
        setYear(dataDate.getFullYear().toString());
        setMonth(dataDate.getMonth().toString());
        setDataDate(dataDate);
        setNowDate(props.nowDate);
    }

    const curMonthWeekCountCheck = (lastDateNum : number) => {
        let mondays = 0;
        let sundays = 0;
        
        let nowMonthWeekCount = 5;
        for(let i=1;i<=lastDateNum;i++){
            let date = new Date(dataDate.getFullYear(),dataDate.getMonth(),i);
            let day = date.getDay();
            if(day === 1){
                mondays++;
            }
            else if(day === 0) {
                sundays++;
            }
        }

        if(mondays === 5 && sundays === 5){
            nowMonthWeekCount = 6;
        }

        return nowMonthWeekCount;
    }

    const formetDateList = (dataDate : Date) => {
        let lastDate = new Date(dataDate.getFullYear(), dataDate.getMonth()+1, 0);

        let lastDateNum = lastDate.getDate();

        const nowMonthWeekCount = curMonthWeekCountCheck(lastDateNum);
        
        let day = 1;
        let overMonth = false;
        let nextDate = 1;
        let prevDate = new Date(dataDate.getFullYear(),dataDate.getMonth(),0);
        let date = new Date(dataDate.getFullYear(),dataDate.getMonth(),day);
        let dataDay = formetDay(date.getDay());
        let prevDateStartNum = prevDate.getDate()-dataDay+1;
        let nextDateStartNum = prevDate.getDate();
        let otherMonth = dataDate.getMonth()-1;
        let result = [];

        for(let i=0;i<nowMonthWeekCount;i++){
            let weeks = [];
            for(let j=0;j<7;j++){
                date = new Date(dataDate.getFullYear(),dataDate.getMonth(),day);
                dataDay = formetDay(date.getDay());
                if(dataDay === j && !overMonth){
                    weeks.push({
                        date,
                        otherDate : false
                    });
                    day++;
                }
                else {
                    if(prevDateStartNum > nextDateStartNum){
                        prevDateStartNum = 1;
                        otherMonth = otherMonth+2;
                    }
                    date = new Date(dataDate.getFullYear(),otherMonth,prevDateStartNum);
                    weeks.push({
                        date,
                        otherDate : true
                    });
                    prevDateStartNum++;
                }
                if(day > lastDateNum){
                    overMonth = true;
                }
            }
            result.push(weeks);
        }

        return result;
    }

    const onPressDate : pressDateType = (date, fometDateText) => {
        setSelectDate(date.toString());
        option.onSelectDate(fometDateText);
    }

    const onPressOverDate : pressOverDateType = (date) => {
        // getDates(new Date(date.getFullYear(),date.getMonth()));
    }

    return (
        <View style={[g.column]}>
            <RowDay theWeekList={dayData} />

            <CalendarsDate dateList={dateData} labelList={onLabelData} labels={labels}
                pressDate={onPressDate} pressOverDate={onPressOverDate} selectDate={selectDate}
                options={{
                    touchableOpacityStyle : option.touchableOpacityStyle,
                    toDayBorderWidth : option.toDayBorderWidth,
                    dateBorderViewStyle : option.dateBorderViewStyle,
                    dateBackgroundViewStyle : option.dateBackgroundViewStyle,
                    enableLabels : option.enableLabels,
                    toDayBackgroundViewStyle : option.toDayBackgroundViewStyle,
                    toDayBorderViewStyle : option.toDayBorderViewStyle,
                    dateTextStyle : option.dateTextStyle,
                    toDayTextStyle : option.toDayTextStyle,
                    selectDateColor : option.selectDateColor,
                    size,
            }}/>
        </View>
    );
}

const s = StyleSheet.create({
    calendarBorder : {
        borderRightWidth:1,
        borderRightColor:'#EEEEEE',
        borderBottomWidth:1,
        borderBottomColor:'#EEEEEE'
    },
    dayBorder : {
        borderRightWidth:2,
        borderRightColor:'#ffffff',
    },
    calendarBorderBottom : {
        borderBottomWidth:1,
        borderBottomColor:'#EEEEEE'
    },
    calendarBorderRight : {
        borderRightWidth:1,
        borderRightColor:'#EEEEEE'
    },
    dayFontSize : {
        fontSize : 13
    },
    dayFontSize_s : {
        fontSize : 11
    },
    dateFontSize : {
        fontSize : 13
    },
    dateFontSize_s : {
        fontSize : 11
    },
    dateLabel : {
        width:5,
        borderRadius:5,
        marginRight:2
    },
    dateLabel_s : {
        width:3,
        borderRadius:3,
        marginRight:1
    },
    dateLabelView : {
        height:5,
        bottom:6
    },
    dateLabelView_s : {
        height:3,
        bottom:2
    }
})


type propsType = {
    size : sizeType,
    labels : labelType,
    option : defaultOptionType,
    dataDate : dataDateType,
    nowDate : nowDateType,
    onLabelData : onLabelData,
}

type dateDataType = Array<weekType>;

type weekType = Array<dateType>;

type dateType = {
    date: Date;
    otherDate: boolean;
};