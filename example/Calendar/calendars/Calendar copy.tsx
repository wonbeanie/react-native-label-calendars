import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import g from '../style/Global.style';
import { useState, useEffect, useLayoutEffect } from 'react';
import { labelType, sizeType, dataDateType, nowDateType, onLabelData, defaultOptionType } from '../Calendars.d';

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
        let lastDate = new Date(dataDate.getFullYear(), dataDate.getMonth()+1, 0);

        let dates = [];
        let lastDateNum = lastDate.getDate();

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

        let day = 1;
        let overMonth = false;
        let nextDate = 1;
        let prevDate = new Date(dataDate.getFullYear(),dataDate.getMonth(),0);
        let date = new Date(dataDate.getFullYear(),dataDate.getMonth(),day);
        let dataDay = setFormmetDay(date.getDay());
        let prevDateStartNum = prevDate.getDate()-dataDay+1;
        let nextDateStartNum = prevDate.getDate();
        let otherMonth = dataDate.getMonth()-1;

        for(let i=0;i<nowMonthWeekCount;i++){
            let weeks = [];
            for(let j=0;j<7;j++){
                date = new Date(dataDate.getFullYear(),dataDate.getMonth(),day);
                dataDay = setFormmetDay(date.getDay());
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
            dates.push(weeks);
        }

        setDateData(dates);
        setYear(dataDate.getFullYear().toString());
        setMonth(dataDate.getMonth().toString());
        setDataDate(dataDate);
        setNowDate(props.nowDate);
    }

    const setFormmetDay = (day:number) => {
        let days = [6,0,1,2,3,4,5];
        return days[day];
    }

    const dayElement = (day : string, num : number) => {
        return (
            <View key={num} style={[g.row,g.center]}>
                <View style={[g.column,g.center,{paddingTop:10,paddingBottom:10}]}>
                    <Text style={{fontSize : 15}}>{day}</Text>
                </View>
            </View>   
        );
    }

    const setTypeData = (onLabel : string, num : number) => {
        return (
            <View key={num} style={[{position:'absolute',width:'100%',flexDirection:'row',justifyContent:'center'},s.dateLabelView]}>
                {
                    labels.map((data,num)=>{
                        return onLabel.indexOf(data.name) !== -1 && <View style={[{backgroundColor:data.color},s.dateLabel]} />
                    })
                }
            </View>
        );
    }

    const setDateBorder = (borderWidth ?: number, type ?: string) => {
        let paddingMax = 10;
        let borderWidthDefault = 3;
        borderWidth = 0;

        if(size === "Small"){
            paddingMax = 5;
            borderWidthDefault = 2;
        }

        if(type){
            borderWidth = borderWidth ? borderWidth : borderWidthDefault;
        }

        let borderStyle = {
            borderViewStyle : {
                padding: borderWidth
            },
            backgroundViewStyle : {
                padding: paddingMax-borderWidth
            }
        };
        
        return borderStyle;
    }

    const dateElement = ({date, otherDate} : dateType, num : number, lastWeek : boolean, lastDate : boolean) => {
        let border = {};
        let nowFormmetDate = setDateFommet(new Date(nowDate));
        let onLabel = ",";
        let initDate = date.getDate();
        let fommetDate = setDateFommet(date);
        let touchableOpacityStyle = [g.row,g.center,option.touchableOpacityStyle];
        let nowDateBorder = setDateBorder(option.toDayBorderWidth, "now");
        let dateBorder = setDateBorder();

        border = s.calendarBorder;

        if(lastWeek){
            border = s.calendarBorderRight;
        }

        if(lastDate){
            border = s.calendarBorderBottom;
        }

        if(lastWeek && lastDate){
            border = {};
        }

        
        onLabelData.some((data,num)=>{
            if(data.date === fommetDate){
                data.onLabel.forEach((label)=>{
                    onLabel += label+",";
                })
            }
        });

        if(otherDate){
            return (
                <TouchableOpacity key={num} style={[touchableOpacityStyle, {backgroundColor: "yellow"}]} onPress={(e)=>{onPressOtherDate(date)}}>
                    <View style={[g.row,g.center,border,{padding:10},option.dateBorderViewStyle, dateBorder.borderViewStyle]}>
                        <View style={[option.dateBackgroundViewStyle,{paddingVertical:'30%'}]}>
                            <Text style={[{color:"#c0c0c0"},s.dateFontSize]}>{initDate}</Text>
                        </View>
                            {
                                option.enableLabels && setTypeData(onLabel, num)
                            }
                    </View>
                </TouchableOpacity>
            );
        }
        if(nowFormmetDate === fommetDate){
            return (
                <TouchableOpacity key={num} style={[touchableOpacityStyle, {backgroundColor: "blue"}]} onPress={(e)=>{onPressDate(e ,initDate, fommetDate)}}>
                    <View style={[g.row,g.center,border,{backgroundColor:'#000'},option.toDayBorderViewStyle, nowDateBorder.borderViewStyle]}>
                        <View style={[g.row,g.center,{backgroundColor:'#ddd'},option.toDayBackgroundViewStyle,{paddingVertical:'30%'}]}>
                            <Text style={[s.dateFontSize,{color:selectDate === initDate.toString() ? option.selectDateColor : "#000", ...option.dateTextStyle, ...option.toDayTextStyle}]}>{initDate}</Text>
                        </View>
                        {
                            option.enableLabels && setTypeData(onLabel, num)
                        }
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity key={num} style={[touchableOpacityStyle, {backgroundColor: "red"}]} onPress={(e)=>{onPressDate(e, initDate, fommetDate)}}>
                <View style={[g.row,g.center,border,{padding:10},option.dateBorderViewStyle, dateBorder.borderViewStyle]}>
                    <View style={[option.dateBackgroundViewStyle,{paddingVertical:'30%'}]}>
                        <Text style={[s.dateFontSize,{color:selectDate === initDate.toString() ? option.selectDateColor : "#000", ...option.dateTextStyle}]}>{initDate}</Text>
                    </View>
                        {
                            option.enableLabels && setTypeData(onLabel, num)
                        }
                </View>
            </TouchableOpacity>
        );
    }

    const onPressDate = (e : any, date : number, fommetDate : string) => {
        setSelectDate(date.toString());
        option.onSelectDate(e, fommetDate);
    }

    const onPressOtherDate = (date : Date) => {
        getDates(new Date(date.getFullYear(),date.getMonth()));
    }

    const setDateFommet = (data : Date) => {
        let year = data.getFullYear();
        let month = (data.getMonth()+1).toString();
        let date = data.getDate().toString();
        if(month.toString().length < 2){
            month = "0"+month;
        }

        if(date.toString().length < 2){
            date = "0"+date;
        }

        return `${year}-${month}-${date}`;
    }

    const weekElement = (week : weekType, num : number, lastWeek : boolean) => {
        return (
            <View key={num} style={[g.row,g.center]}>
                {
                    week.map((data,num)=>{
                        let lastDate = false;
                        if(num === week.length-1){
                            lastDate = true;
                        }
                        return dateElement(data, num, lastWeek, lastDate);
                    })
                }
            </View>            
        );
    }

    return (
        <View style={[g.column]}>
            <View style={[g.row,{flex:2}]}>
                {
                    dayData.map((data,num)=>{
                        return dayElement(data,num);
                    })
                }
            </View>
            <View style={[g.column,{flex:8,borderWidth:2,borderColor:'#CCCCCC'}]}>
                {
                    dateData.map((data,num)=>{
                        let lastWeek = false;
                        if(num === dateData.length-1){
                            lastWeek = true;
                        }
                        
                        return weekElement(data, num, lastWeek);
                    })
                }
            </View>
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
    labels : labelType[],
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