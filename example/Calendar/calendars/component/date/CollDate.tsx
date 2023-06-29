import React from 'react';
import { StyleSheet } from 'react-native';
import { formatDate } from '../../utils/utils';
import { collDateType } from '../../../type/compoent/day';
import OverDateBtn from './btn/OverDateBtn';
import NowDateBtn from './btn/NowDateBtn';
import DateBtn from './btn/DateBtn';
import { CalendarsDateContext } from '../../../context/CalendarsDateContext';
import { useContext } from 'react';

interface DateProps {
    collDate : collDateType;
    lastWeek : boolean;
    lastDate : boolean;
}

const CollDate = ({collDate, lastWeek, lastDate}: DateProps) => {
    const {date, otherDate} = collDate;

    const { labelList } = useContext(CalendarsDateContext);

    let border = {};
    let onLabel = "";
    const nowFormatDateText = formatDate(new Date());
    const fomatDateText = formatDate(date);

    border = s.border;

    if(lastWeek){
        border = s.borderRight;
    }

    if(lastDate){
        border = s.borderBottom;
    }

    if(lastWeek && lastDate){
        border = {};
    }

    
    labelList.some((data)=>{
        if(data.date === fomatDateText){
            data.onLabel.forEach((label)=>{
                onLabel += label+",";
            })
        }
    });

    if(otherDate){
        return <OverDateBtn date={date} label={onLabel}/>
    }

    if(nowFormatDateText === fomatDateText){
        return <NowDateBtn date={date} label={onLabel} fomatDateText={fomatDateText}/>
    }

    return (
        <DateBtn date={date} label={onLabel} fomatDateText={fomatDateText}/>
    );
};

export default CollDate;

const s = StyleSheet.create({
    border : {
        borderRightWidth:1,
        borderRightColor:'#EEEEEE',
        borderBottomWidth:1,
        borderBottomColor:'#EEEEEE'
    },
    borderBottom : {
        borderBottomWidth:1,
        borderBottomColor:'#EEEEEE'
    },
    borderRight : {
        borderRightWidth:1,
        borderRightColor:'#EEEEEE'
    },
});
