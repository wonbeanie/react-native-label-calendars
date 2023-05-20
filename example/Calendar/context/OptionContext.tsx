import React, {createContext} from 'react';
import { theWeekLangFormatType } from '../type/compoent/day';
import { TextStyle, ViewStyle } from 'react-native/types';

export const defaultOption : defaultOptionType = {
    disableMonthChange : {
        next : false,
        prev : false
    },
    enableLabels : true,
    selectDateColor : "#0077CC",
    onSelectDate : (fullDate : string)=>{console.log(`Select Date ${fullDate}`);},
    titleFormat : "{month} {year}",
    weekLangFormat : ["Mon","Tue","Wed","Thu","Fir","Sat","Sun"],
    prevButton : ()=>false,
    nextButton : ()=>false,
    titleViewStyle : {},
    titleStyle : {},
    onPressStyle : {},
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

export const OptionContext = createContext(defaultOption);

export interface defaultOptionType {
    disableMonthChange : disableMonthChangeType,
    enableLabels : boolean;
    selectDateColor : string;
    onSelectDate : (fullDate : string)=>void;
    titleFormat : string;
    weekLangFormat : theWeekLangFormatType;
    prevButton : ()=>JSX.Element | false;
    nextButton : ()=>JSX.Element | false;
    titleViewStyle : ViewStyle;
    titleStyle : TextStyle;
    onPressStyle : ViewStyle;
    toDayTextStyle : TextStyle;
    dateTextStyle : TextStyle;
    toDayViewStyle : ViewStyle;
    toDayBorderViewStyle : ViewStyle;
    toDayBackgroundViewStyle : ViewStyle;
    dateBorderViewStyle : ViewStyle;
    dateBackgroundViewStyle : ViewStyle;
    toDayBorderWidth : number;
    onNextPress : (nextTitle : string)=>void;
    onPrevPress : (prevTitle : string)=>void;
}

export interface disableMonthChangeType {
    next : boolean;
    prev : boolean;
}