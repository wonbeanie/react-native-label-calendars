import { View } from 'react-native';
import g from '../../../../style/Global.style';
import { weekListType } from '../../../../type/compoent/day';
import CollDate from './CollDate';
import React from 'react';

interface RowWeekProps {
    weekList : weekListType;
    lastWeek : boolean;
}

const RowWeek = ({weekList, lastWeek}: RowWeekProps) => {
    return (
        <View style={[g.row,g.center]}>
            {
                weekList.map((data,num)=>{
                    let lastDate = false;
                    if(num === weekList.length-1){
                        lastDate = true;
                    }
                    
                    return <CollDate collDate={data} lastWeek={lastWeek} lastDate={lastDate} />
                })
            }
        </View>
    );
};

export default RowWeek;