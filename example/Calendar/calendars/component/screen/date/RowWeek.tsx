import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import g from '../../../../style/Global.style';
import { weekListType } from '../../../../type/compoent/day';
import CollDate from './CollDate';
import { onLabelData } from '../../../../Calendars.d';

interface RowWeekProps {
    weekList : weekListType;
    lastWeek : boolean;
    options : dateOptionType;
    labelList : onLabelData;
}

const RowWeek = ({weekList, lastWeek, labelList, options}: RowWeekProps) => {
    return (
        <View style={[g.row,g.center]}>
            {
                weekList.map((data,num)=>{
                    let lastDate = false;
                    if(num === weekList.length-1){
                        lastDate = true;
                    }
                    
                    return <CollDate collDate={data} lastWeek={lastWeek} lastDate={lastDate} labelList={labelList} options={options}/>
                })
            }
        </View>
    );
};

export default RowWeek;