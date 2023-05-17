import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import g from '../../../../style/Global.style';
import { dateListType } from '../../../../type/compoent/day';
import RowWeek from './RowWeek';
import { labelType, onLabelData } from '../../../../Calendars.d';
import { dateOptionType, pressDateType, pressOverDateType } from '../../../../type/compoent/date';

interface CalendarsDateProps {
    dateList : dateListType;
    labels : labelType;
    labelList : onLabelData;
    pressDate : pressDateType;
    pressOverDate : pressOverDateType;
    selectDate : string;
    options : dateOptionType;
}

const CalendarsDate = ({dateList, options, labelList, pressDate, pressOverDate, selectDate, labels}: CalendarsDateProps) => {
    return (
        <View style={[g.column, s.container]}>
            {
                dateList.map((data,num)=>{
                    let lastWeek = false;
                    if(num === dateList.length-1){
                        lastWeek = true;
                    }
                    
                    return <RowWeek weekList={data} labels={labels} lastWeek={lastWeek} pressDate={pressDate}
                    selectDate={selectDate} pressOverDate={pressOverDate} labelList={labelList} options={options}/>;
                })
            }
        </View>
    );
};

export default CalendarsDate;

const s = StyleSheet.create({
    container: {
        flex:8,
        borderWidth:2,
        borderColor:'#CCCCCC'
    }
});
