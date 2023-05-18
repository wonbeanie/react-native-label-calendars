import React, { useRef } from 'react';
import {Image, ScrollView, TouchableOpacity, Dimensions, Text, View, ViewStyle, TextStyle, ColorValue } from 'react-native';
import g from './style/Global.style';
import { useState, useEffect, useLayoutEffect } from 'react';
import Calendar from './calendars/Calendar';
import {defaultOptionType, labelType, nowDateType, onLabelData, optionType, sizeType} from './Calendars.d';

export default function Calendars({onLabelData , ...props} : propsType){
    const [nowDate, setNowDate] = useState<nowDateType>(new Date());
    const [dataDate, setDataDate] = useState<nowDateType>(new Date());
    const [sizeType, setSizeType] = useState<sizeType>(defaultSize);
    const [year, setYaer] = useState<string>('2021');
    const [month, setMonth] = useState<string>('1');
    const engMonth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let labels = props.labels.length > 5 ? props.labels.slice(0,5) : props.labels;
    let option = {
        ...defaultOption,
        ...props.option
    } as defaultOptionType;
 
    //didmount
    useLayoutEffect(()=>{
        setDate();
    },[]);

    const setDate = () => {
        let nowDateTemp = new Date();
        let year = nowDateTemp.getFullYear();
        let month = nowDateTemp.getMonth()+1;
        setNowDate(nowDateTemp);
        setDataDate(nowDateTemp);
        setYaer(year.toString());
        setMonth(month.toString());
    }

    const nextMonth = (e : any) => {
        let nextDate = new Date(dataDate.getFullYear(),dataDate.getMonth()+1);
        let year = nextDate.getFullYear();
        let month = nextDate.getMonth()+1;
        setYaer(year.toString());
        setMonth(month.toString());
        setDataDate(nextDate);
        let title = formmatTitle({
            initYear : year.toString(),
            initMonth : month.toString()
        });
        if(option.onNextPress){
            option.onNextPress(title);
        }
    }

    const prevMonth = (e : any) => {
        let nextDate = new Date(dataDate.getFullYear(),dataDate.getMonth()-1);
        let year = nextDate.getFullYear();
        let month = nextDate.getMonth()+1;
        setYaer(year.toString());
        setMonth(month.toString());
        setDataDate(nextDate);
        let title = formmatTitle({
            initYear : year.toString(),
            initMonth : month.toString()
        });
        if(option.onPrevPress){
            option.onPrevPress(title);
        }
    }

    const sameDate = () => {
        if(dataDate.getFullYear() === nowDate.getFullYear()){
            if(dataDate.getMonth() === nowDate.getMonth()){
                return false;
            }
        }
        return true;
    }

    const formmatTitle = (initDate ?: initDateType) => {
        let dates = initDate ? initDate : {
            initYear : year,
            initMonth : month
        };


        let titleDate = option.titleFormmat;

        let titleYear = dates.initYear;
        let titleMonth = dates.initMonth;
        let titleEngMonth = engMonth[Number(titleMonth)-1];
        titleDate = titleDate.replace("{year}",titleYear);
        titleDate = titleDate.replace("{month}",titleEngMonth);
        titleDate = titleDate.replace("{koMonth}",titleMonth);
        return titleDate;
    }

    const defaultButton = (direction ?: "next") => {
        let onPress = prevMonth;
        let image = require('./image/calendar_arrow_left.png');
        if(direction === "next"){
            onPress = nextMonth;
            image = require('./image/calendar_arrow_right.png');
        }

        return (
            <TouchableOpacity style={[g.row,g.center,{flex:2.5,padding:10}]} onPress={(e)=>{
                onPress(e);
            }}>
                <Image source={image} style={{width:20,height:20}} resizeMode="cover"/>
            </TouchableOpacity>
        );
    }
    return (
        <ScrollView style={{backgroundColor:"#fff"}}>
            <View style={[g.column]}>
                <View style={[g.row,g.center]}>

                    {
                        option.disableMonthChange.prev && !sameDate() ? (
                            <View style={[g.row,g.center,{flex:2.5,padding:10}]} />
                        ) : option.prevButton() ? option.prevButton() : defaultButton()
                    }

                    <View style={[g.row,g.center,{flex:5,padding:10,...option.titleViewStyle}]}>
                        <Text style={{color:'#000000',fontSize:sizeType === "Big" ? 20 : 15,fontWeight:'bold',...option.titleStyle}}>{formmatTitle()}</Text>
                    </View>

                    {
                        option.disableMonthChange.next && !sameDate() ? (
                            <View style={[g.row,g.center,{flex:2.5,padding:10}]} />
                        ) : option.nextButton() ? option.nextButton() : defaultButton("next")
                    }

                </View>
                <View style={[g.row]}>
                    <Calendar nowDate={nowDate} dataDate={dataDate} onLabelData={onLabelData} labels={labels} option={option} size={sizeType}/>
                </View>
                <View style={[g.row,{flexWrap:'wrap'}]}>
                    {
                        option.enableLabels && 
                        labels.map((data, num)=>{
                            let name = data.name;
                            return (
                                <View key={num} style={[{marginRight:10,flexDirection:"row",alignItems:"center"}]}>
                                    <View style={{width:10,height:10,backgroundColor:data.color,borderRadius:10}} />
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:13,color:'#B4B4B4',marginLeft:5}}>
                                        {name}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>
    );
}

type propsType = {
    labels : labelType,
    option ?: optionType,
    onLabelData : onLabelData
}

export let defaultOption : defaultOptionType = {
    disableMonthChange : {
        next : false,
        prev : false
    },
    enableLabels : true,
    selectDateColor : "#0077CC",
    onSelectDate : (fullDate : string)=>{console.log(`Select Date ${fullDate}`);},
    titleFormmat : "{month} {year}",
    weekLangFormat : ["Mon","Tue","Wed","Thu","Fir","Sat","Sun"],
    prevButton : ()=>false,
    nextButton : ()=>false,
    titleViewStyle : {},
    titleStyle : {},
    touchableOpacityStyle : {},
    toDayTextStyle : {},
    dateTextStyle : {},
    toDayViewStyle : {},
    toDayBorderViewStyle : {},
    toDayBackgroundViewStyle : {},
    dateBorderViewStyle : {},
    dateBackgroundViewStyle : {},
    toDayBorderWidth : 3,
    onNextPress : (nextTitle : string)=>{console.log(`Next Title ${nextTitle}`);},
    onPrevPress : (prevTitle : string)=>{console.log(`Prev Title ${prevTitle}`);},
}

export const defaultSize = "Big";

type initDateType = {
    initYear : string,
    initMonth : string
}