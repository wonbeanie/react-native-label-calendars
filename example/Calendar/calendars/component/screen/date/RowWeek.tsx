import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import g from '../../../../style/Global.style';
import { weekListType } from '../../../../type/compoent/day';
import CollDate from './CollDate';
import { labelType, onLabelData } from '../../../../Calendars.d';
import { dateOptionType, pressDateType, pressOverDateType } from '../../../../type/compoent/date';

interface RowWeekProps {
    weekList : weekListType;
    lastWeek : boolean;
    labels : labelType;
    pressDate : pressDateType;
    pressOverDate : pressOverDateType;
    options : dateOptionType;
    labelList : onLabelData;
    selectDate: string;
}

const RowWeek = ({weekList, lastWeek, labelList, labels, pressDate, pressOverDate, selectDate, options}: RowWeekProps) => {
    return (
        <View style={[g.row,g.center]}>
            {
                weekList.map((data,num)=>{
                    let lastDate = false;
                    if(num === weekList.length-1){
                        lastDate = true;
                    }
                    
                    return <CollDate collDate={data} labels={labels} lastWeek={lastWeek} lastDate={lastDate} pressDate={pressDate}
                    selectDate={selectDate} pressOverDate={pressOverDate} labelList={labelList} options={options}/>
                })
            }
        </View>
    );
};

export default RowWeek;