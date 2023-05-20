import React, {createContext} from 'react';
import { defaultSize } from '../Calendars';
import { dateOptionType, pressDateType, pressOverDateType } from '../type/compoent/date';
import { labelType, onLabelData } from '../Calendars.d';
import { defaultOption } from './OptionContext';

const {
    onPressStyle, toDayBorderWidth, dateBorderViewStyle,
    dateBackgroundViewStyle, enableLabels, toDayBackgroundViewStyle,
    toDayBorderViewStyle, dateTextStyle, toDayTextStyle,
    selectDateColor
} = defaultOption;

export const initCalendarsDateContext : calendarsDateContextType = {
    options : {
        onPressStyle,
        toDayBorderWidth,
        dateBorderViewStyle,
        dateBackgroundViewStyle,
        enableLabels,
        toDayBackgroundViewStyle,
        toDayBorderViewStyle,
        dateTextStyle,
        toDayTextStyle,
        selectDateColor,
        size : defaultSize,
    },
    labelList : [],
    pressDate : (date : string, fometDateText : string)=>{},
    pressOverDate : (date : Date) => {},
    selectDate : '',
    labels : []
}

export const CalendarsDateContext = createContext(initCalendarsDateContext);

export interface calendarsDateContextType {
    options : dateOptionType;
    labels : labelType[];
    labelList : onLabelData;
    pressDate : pressDateType;
    pressOverDate : pressOverDateType;
    selectDate : string;
}