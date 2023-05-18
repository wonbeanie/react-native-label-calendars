import React, { useContext } from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import g from '../style/Global.style';
import { useState, useEffect, useLayoutEffect } from 'react';
import { labelType, sizeType, dataDateType, nowDateType, onLabelData, defaultOptionType } from '../Calendars.d';
import { RowDay } from './component/screen/day';
import { CalendarsDate } from './component/screen/date';
import { dateOptionType, pressDateType, pressOverDateType } from '../type/compoent/date';
import { dateListType } from '../type/compoent/day';
import { formetDay } from './utils/utils';
import { CalendarsDateContext, calendarsDateContextType, initCalendarsDateContext } from '../context/CalendarsDateContext';

export default function Calendar({size, labels, option, onLabelData, ...props} : propsType){
    const [dateData, setDateData] = useState<dateListType>([]);
    const [year, setYear] = useState<string>('2021');
    const [month, setMonth] = useState<string>('1');
    const [dataDate, setDataDate] = useState<Date>(new Date());
    const [nowDate, setNowDate] = useState<Date>(new Date());
    const [selectDate, setSelectDate] = useState<string>('');
    const [calendarsDateOptions, setCalendarsDateOptions] = useState<calendarsDateContextType>(initCalendarsDateContext);
    let dayData = option.weekLangFormat.length > 7 ? option.weekLangFormat.splice(0,7) : option.weekLangFormat;

    //didmount
    useLayoutEffect(()=>{
        getDates(props.dataDate);
    },[props.dataDate]);

    useEffect(()=>{
        initContext();
    },[]);

    const initContext = () => {
        setCalendarsDateOptions({
            options : {
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
                size
            },
            labelList : onLabelData,
            labels : labels,
            pressDate : onPressDate,
            pressOverDate : onPressOverDate,
            selectDate : selectDate
        });
    }

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
            <RowDay theWeekList={dayData}/>
            
            <CalendarsDateContext.Provider value={calendarsDateOptions}>
                <CalendarsDate dateList={dateData} />
            </CalendarsDateContext.Provider>

        </View>
    );
}


type propsType = {
    size : sizeType,
    labels : labelType,
    option : defaultOptionType,
    dataDate : dataDateType,
    nowDate : nowDateType,
    onLabelData : onLabelData,
}