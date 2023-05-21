import { TextStyle, ViewStyle } from "react-native";
import { theWeekLangFormatType } from "./type/compoent/day";

export type labelType = {
    name : string,
    color : string
}

export type dataDateType = Date;

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
    titleFormat ?: string,
    weekLangFormat ?: string[],
    monthLangFormat ?: string[],
    prevButton ?: ()=>boolean,
    nextButton ?: ()=>boolean,
    titleViewStyle ?: ViewStyle,
    titleStyle ?: ViewStyle,
    onPressStyle ?: ViewStyle,
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