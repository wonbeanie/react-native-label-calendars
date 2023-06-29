import React, {createContext} from 'react';
import { pressDateType, pressOverDateEnum, pressOverDateType } from '../type/compoent/date';
import { labelType, onLabelData } from '../Calendars.d';

export const initCalendarsDateContext : calendarsDateContextType = {
    labelList : [],
    pressDate : (date : string, fometDateText : string)=>{},
    pressOverDate : (date : pressOverDateEnum) => {},
    selectDate : '',
    labels : [],
    curDate : new Date()
}

export const CalendarsDateContext = createContext(initCalendarsDateContext);

export interface calendarsDateContextType {
    labels : labelType[];
    labelList : onLabelData;
    pressDate : pressDateType;
    pressOverDate : pressOverDateType;
    selectDate : string;
    curDate : Date;
}