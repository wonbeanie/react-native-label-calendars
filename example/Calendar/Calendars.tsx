import React, {useState, useLayoutEffect} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import g from './style/Global.style';
import Calendar from './calendars/Calendar';
import {labelType, nowDateType, onLabelData, optionType} from './Calendars.d';
import { OptionContext, defaultOption, defaultOptionType } from './context/OptionContext';
import TopVar from './calendars/component/topvar/TopVar';
import { BottomLabel } from './calendars/component/label';
import { dateMonthCompare } from './calendars/utils/utils';
import { moveDateEnum } from './type/compoent/date.d';

export default function Calendars({onLabelData = [], labels : propsLabel = [], option : propsOption} : propsType){
    const [nowDate, setNowDate] = useState<nowDateType>(new Date());
    const [dataDate, setDataDate] = useState<nowDateType>(new Date());
    const [option, setOption] = useState<defaultOptionType>(defaultOption);
    const [year, setYaer] = useState<string>('2021');
    const [month, setMonth] = useState<string>('1');
    let labels = propsLabel.length > 5 ? propsLabel.slice(0,5) : propsLabel;
 
    useLayoutEffect(()=>{
        init();
        setDate();
    },[]);

    const init = () => {
        let resultOption = defaultOption;
        if(propsOption){
            resultOption = Object.assign(resultOption,propsOption);
        }
        setOption(resultOption);
    }

    const setDate = () => {
        let nowDateTemp = new Date();
        let year = nowDateTemp.getFullYear();
        let month = nowDateTemp.getMonth()+1;
        setNowDate(nowDateTemp);
        setDataDate(nowDateTemp);
        setYaer(year.toString());
        setMonth(month.toString());
    }

    const nextMonth = () => {
        let nextDate = new Date(dataDate.getFullYear(),dataDate.getMonth()+1);
        let year = nextDate.getFullYear();
        let month = nextDate.getMonth()+1;
        let range = new Date(option.moveDateRange.max);
        let currnetCheck = dateMonthCompare(dataDate, range);
        let nextCheck = dateMonthCompare(nextDate, range);
        if(moveDateRangeCheck(nextCheck, moveDateRangeType.MAX)){
            return;
        }

        let title = formatTitle({
            initYear : year.toString(),
            initMonth : month.toString()
        });

        if(option.onNextPress){
            option.onNextPress(title);
            if(currnetCheck){
                return;
            }
        }

        setYaer(year.toString());
        setMonth(month.toString());
        setDataDate(nextDate);
    }

    const prevMonth = () => {
        let nextDate = new Date(dataDate.getFullYear(),dataDate.getMonth()-1);
        let year = nextDate.getFullYear();
        let month = nextDate.getMonth()+1;
        let range = new Date(option.moveDateRange.min);
        let currnetCheck = dateMonthCompare(range, dataDate);
        let nextCheck = dateMonthCompare(range, nextDate);
        if(moveDateRangeCheck(nextCheck, moveDateRangeType.MIN)){
            return;
        }

        let title = formatTitle({
            initYear : year.toString(),
            initMonth : month.toString()
        });

        if(option.onPrevPress){
            option.onPrevPress(title);
            if(currnetCheck){
                return;
            }
        }

        setYaer(year.toString());
        setMonth(month.toString());
        setDataDate(nextDate);
    }

    const moveDateRangeCheck = (next : boolean, type : moveDateRangeType) => {
        let newOption = {
            ...option,
            disableMonthChange : {
                prev : false,
                next : false
            }
        }

        if(!next){
            setOption(newOption);
            return false;
        }

        if(type === moveDateRangeType.MIN){
            newOption.disableMonthChange.prev = true;
        }
        else {
            newOption.disableMonthChange.next = true;
        }
        setOption(newOption);

        if(next){
            return false;
        }

        return true;
    }

    const formatTitle = (initDate ?: initDateType) => {
        let dates = initDate ? initDate : {
            initYear : year,
            initMonth : month
        };


        let dateText = option.titleFormat;

        let yearText = dates.initYear;
        let monthText = dates.initMonth;
        let monthTitleText = option.monthLangFormat[Number(monthText)-1];
        dateText = dateText.replace("{year}",yearText);
        dateText = dateText.replace("{month}",monthTitleText);
        dateText = dateText.replace("{koMonth}",monthText);
        return dateText;
    }

    const moveDate = (type : moveDateEnum) => {
        if(!option.overDateClickToMove){
            return;
        }
        
        if(type === moveDateEnum.NEXT){
            nextMonth();
            return;
        }
        prevMonth();
    }

    return (
        <ScrollView style={s.container}>
            <OptionContext.Provider value={option}>
                <View style={[g.column]}>

                    <TopVar
                        dataDate={dataDate} formatTitle={formatTitle} nextMonth={nextMonth}
                        nowDate={nowDate} prevMonth={prevMonth}
                    />

                    <View style={[g.row]}>
                        <Calendar
                            nowDate={nowDate} dataDate={dataDate} onLabelData={onLabelData}
                            labels={labels} moveDate={moveDate}
                        />
                    </View>

                    <BottomLabel labels={labels} />

                </View>
            </OptionContext.Provider>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor:"#fff"
    }
});

type propsType = {
    labels ?: labelType[],
    option ?: optionType,
    onLabelData ?: onLabelData
}

export type initDateType = {
    initYear : string,
    initMonth : string
}

enum moveDateRangeType {
    MIN = "min",
    MAX = "max"
}