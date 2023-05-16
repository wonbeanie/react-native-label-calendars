import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import g from '../../../../style/Global.style';
import { dateListType } from '../../../../type/compoent/day';
import RowWeek from './RowWeek';
import { onLabelData } from '../../../../Calendars.d';

interface CalendarsDateProps {
    dateList : dateListType;
    options : dateOptionType;
    labelList : onLabelData;
}

const CalendarsDate = ({dateList, options, labelList}: CalendarsDateProps) => {
    return (
        <View style={[g.column, s.container]}>
            {
                dateList.map((data,num)=>{
                    let lastWeek = false;
                    if(num === dateList.length-1){
                        lastWeek = true;
                    }
                    
                    return <RowWeek weekList={data} lastWeek={lastWeek} labelList={labelList} options={options}/>;
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
