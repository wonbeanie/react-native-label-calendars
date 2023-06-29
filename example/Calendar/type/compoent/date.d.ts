import { labelType } from "../../Calendars";

export interface dateOptionType {
    onPressStyle : ViewStyle;
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

export type pressDateType = (date : string, fometDateText : string, labels : string)=>void;
export type pressOverDateType = (dateMove : moveDateEnum)=>void;
export enum moveDateEnum {
    PREV,
    NEXT
}