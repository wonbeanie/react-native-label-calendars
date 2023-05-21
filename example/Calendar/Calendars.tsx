import React, {useState, useLayoutEffect} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import g from './style/Global.style';
import Calendar from './calendars/Calendar';
import {labelType, nowDateType, onLabelData, optionType} from './Calendars.d';
import { OptionContext, defaultOption, defaultOptionType } from './context/OptionContext';
import TopVar from './calendars/component/topvar/TopVar';
import { BottomLabel } from './calendars/component/label';

export default function Calendars({onLabelData , ...props} : propsType){
    const [nowDate, setNowDate] = useState<nowDateType>(new Date());
    const [dataDate, setDataDate] = useState<nowDateType>(new Date());
    const [option, setOption] = useState<defaultOptionType>(defaultOption);
    const [year, setYaer] = useState<string>('2021');
    const [month, setMonth] = useState<string>('1');
    let labels = props.labels.length > 5 ? props.labels.slice(0,5) : props.labels;
 
    useLayoutEffect(()=>{
        init();
        setDate();
    },[]);

    const init = () => {
        let resultOption = defaultOption;
        if(props.option){
            resultOption = Object.assign(resultOption,props.option);
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
        setYaer(year.toString());
        setMonth(month.toString());
        setDataDate(nextDate);
        let title = formatTitle({
            initYear : year.toString(),
            initMonth : month.toString()
        });
        if(option.onNextPress){
            option.onNextPress(title);
        }
    }

    const prevMonth = () => {
        let nextDate = new Date(dataDate.getFullYear(),dataDate.getMonth()-1);
        let year = nextDate.getFullYear();
        let month = nextDate.getMonth()+1;
        setYaer(year.toString());
        setMonth(month.toString());
        setDataDate(nextDate);
        let title = formatTitle({
            initYear : year.toString(),
            initMonth : month.toString()
        });
        if(option.onPrevPress){
            option.onPrevPress(title);
        }
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
                            labels={labels}
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
    labels : labelType[],
    option ?: optionType,
    onLabelData : onLabelData
}

export type initDateType = {
    initYear : string,
    initMonth : string
}