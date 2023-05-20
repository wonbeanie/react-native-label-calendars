import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { labelType } from '../../../Calendars.d';

interface LabelProps {
    labels : labelType;
}

const Label = ({labels}: LabelProps) => {
    const {name, color} = labels;
    const colorLabelStyle = {backgroundColor:color}

    return (
        <View style={s.container}>
            <View style={[s.colorLabel, colorLabelStyle]} />
            <Text numberOfLines={1} ellipsizeMode='tail' style={s.text}>
                {name}
            </Text>
        </View>
    );
};

export default Label;

const s = StyleSheet.create({
    container: {
        marginRight:10,
        flexDirection:"row",
        alignItems:"center"
    },
    colorLabel : {
        width:10,
        height:10,
        borderRadius:10
    },
    text : {
        fontSize:13,
        color:'#B4B4B4',
        marginLeft:5
    }
});
