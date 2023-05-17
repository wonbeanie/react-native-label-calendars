import { labelType } from "../../Calendars";

export interface dateOptionType {
    touchableOpacityStyle : ViewStyle;
    toDayBorderWidth : number;
    dateBorderViewStyle : ViewStyle;
    dateBackgroundViewStyle : ViewStyle;
    enableLabels : boolean;
    toDayBackgroundViewStyle : ViewStyle;
    toDayBorderViewStyle : ViewStyle;
    dateTextStyle : ViewStyle;
    toDayTextStyle : ViewStyle;
    selectDateColor : string;
    size : sizeType;
}

export type pressDateType = (date : string, fometDateText : string)=>void;
export type pressOverDateType = (date : Date)=>void;