import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { OptionContext } from '../../../context/OptionContext';
import { labelType } from '../../../Calendars.d';
import g from '../../../style/Global.style';
import Label from './Label';

interface LabelListProps {
    labels : labelType[];
}

const LabelList = ({labels}: LabelListProps) => {
    const {enableLabels} = useContext(OptionContext);

    return (
        <View style={[g.row, s.container]}>
            {
                enableLabels && 
                labels.map((data, num)=>{
                    return <Label labels={data} />
                })
            }
        </View>
    );
};

export default LabelList;

const s = StyleSheet.create({
    container: {
        flexWrap:'wrap'
    }
});
