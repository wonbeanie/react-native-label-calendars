import React, { useContext } from 'react';
import {View} from 'react-native';
import g from '../style/Global.style';
import { useState, useEffect, useLayoutEffect } from 'react';
import { labelType, dataDateType, nowDateType, onLabelData } from '../Calendars.d';
import { CalendarsDate } from './component/date';
import {  pressDateType, pressOverDateType } from '../type/compoent/date';
import { dateListType } from '../type/compoent/day';
import { formatDay } from './utils/utils';
import { CalendarsDateContext, calendarsDateContextType, initCalendarsDateContext } from '../context/CalendarsDateContext';
import { OptionContext } from '../context/OptionContext';
import { RowDay } from './component/day';

export default function Calendar({labels, onLabelData, ...props} : propsType){
    const [dateData, setDateData] = useState<dateListType>([]);
    const [year, setYear] = useState<string>('2021');
    const [month, setMonth] = useState<string>('1');
    const [dataDate, setDataDate] = useState<Date>(new Date());
    const [nowDate, setNowDate] = useState<Date>(new Date());
    const [selectDate, setSelectDate] = useState<string>('');
    const [calendarsDateOptions, setCalendarsDateOptions] = useState<calendarsDateContextType>(initCalendarsDateContext);
    const {
        weekLangFormat,
        onSelectDate
    } = useContext(OptionContext);

    //didmount
    useLayoutEffect(()=>{
        getDates(props.dataDate);
    },[props.dataDate]);

    useEffect(()=>{
        initContext();
    },[]);

    const initContext = () => {
        setCalendarsDateOptions({
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

        const resultDate = formatDateList(dataDate);

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

    const formatDateList = (dataDate : Date) => {
        let lastDate = new Date(dataDate.getFullYear(), dataDate.getMonth()+1, 0);

        let lastDateNum = lastDate.getDate();

        const nowMonthWeekCount = curMonthWeekCountCheck(lastDateNum);
        
        let day = 1;
        let overMonth = false;
        let nextDate = 1;
        let prevDate = new Date(dataDate.getFullYear(),dataDate.getMonth(),0);
        let date = new Date(dataDate.getFullYear(),dataDate.getMonth(),day);
        let dataDay = formatDay(date.getDay());
        let prevDateStartNum = prevDate.getDate()-dataDay+1;
        let nextDateStartNum = prevDate.getDate();
        let otherMonth = dataDate.getMonth()-1;
        let result = [];

        for(let i=0;i<nowMonthWeekCount;i++){
            let weeks = [];
            for(let j=0;j<7;j++){
                date = new Date(dataDate.getFullYear(),dataDate.getMonth(),day);
                dataDay = formatDay(date.getDay());
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

    const onPressDate : pressDateType = (date, fometDateText, label) => {
        setSelectDate(date.toString());
        let selectDateLabel : string | undefined = label;
        if(label === ""){
            selectDateLabel = undefined;
        }
        onSelectDate(fometDateText, selectDateLabel);
    }

    const onPressOverDate : pressOverDateType = (date) => {
        // getDates(new Date(date.getFullYear(),date.getMonth()));
    }

    return (
        <View style={[g.column]}>
            <RowDay theWeekList={weekLangFormat}/>
            
            <CalendarsDateContext.Provider value={calendarsDateOptions}>
                <CalendarsDate dateList={dateData} />
            </CalendarsDateContext.Provider>

        </View>
    );
}


type propsType = {
    labels : labelType[],
    dataDate : dataDateType,
    nowDate : nowDateType,
    onLabelData : onLabelData,
}