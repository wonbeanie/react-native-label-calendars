import { TextStyle, ViewStyle } from "react-native";
import { theWeekLangFormatType } from "./type/compoent/day";

export type labelType = Array<{
    name : string,
    color : string
}>

export type dataDateType = Date;

export type sizeType = "Small" | "Big";

export type nowDateType = Date;

export type onLabelData = Array<{
    date : string,
    onLabel : Array<string>
}>

export type optionType = {
    disableMonthChange ?: {
        next ?: boolean,
        prev ?: boolean
    },
    enableLabels ?: boolean,
    selectDateColor ?: string,
    onSelectDate ?: (e : any, fullDate : string)=>void,
    titleFormmat ?: string,
    weekLangFormmat ?: Array<string>,
    prevButton ?: ()=>boolean,
    nextButton ?: ()=>boolean,
    titleViewStyle ?: ViewStyle,
    titleStyle ?: ViewStyle,
    touchableOpacityStyle ?: ViewStyle,
    toDayTextStyle ?: TextStyle,
    dateTextStyle ?: TextStyle,
    toDayViewStyle ?: ViewStyle,
    toDayBorderViewStyle ?: ViewStyle,
    toDayBackgroundViewStyle ?: ViewStyle,
    dateBorderViewStyle ?: ViewStyle,
    dateBackgroundViewStyle ?: ViewStyle,
    toDayBorderWidth ?: number,
    onNextPress ?: (e : any, nextTitle : string)=>void,
    onPrevPress ?: (e : any, prevTitle : string)=>void,
}

export type defaultOptionType = {
    disableMonthChange : {
        next : boolean,
        prev : boolean
    },
    enableLabels : boolean,
    selectDateColor : string,
    onSelectDate : (fullDate : string)=>void,
    titleFormmat : string,
    weekLangFormat : theWeekLangFormatType,
    prevButton : ()=>JSX.Element | false,
    nextButton : ()=>JSX.Element | false,
    titleViewStyle : ViewStyle,
    titleStyle : TextStyle,
    touchableOpacityStyle : ViewStyle,
    toDayTextStyle : TextStyle,
    dateTextStyle : TextStyle,
    toDayViewStyle : ViewStyle,
    toDayBorderViewStyle : ViewStyle,
    toDayBackgroundViewStyle : ViewStyle,
    dateBorderViewStyle : ViewStyle,
    dateBackgroundViewStyle : ViewStyle,
    toDayBorderWidth : number,
    onNextPress : (nextTitle : string)=>void,
    onPrevPress : (prevTitle : string)=>void,
}