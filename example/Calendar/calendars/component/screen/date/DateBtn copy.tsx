import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import g from '../../../../style/Global.style';

interface DateBtnProps {
    btnStyle : any;
    onPress : () => void;
    btnType : "OVER_DATE" | "DATE" | "NOWDATE";
    backgroundViewStyle : any;
}

const DateBtn = ({btnStyle, onPress, backgroundViewStyle}: DateBtnProps) => {
    const onPressBtn = (e : any) => {
        onPress();
    }

    return (
        <>
            <Pressable style={[g.row,g.center, btnStyle]} onPress={onPressBtn}>
                <View style={[g.row,g.center, s.overDate, backgroundViewStyle]}>
                    <View style={[option.dateBackgroundViewStyle,s.dateTextView]}>
                        <Text style={[{color:"#c0c0c0"},s.dateFontSize]}>{initDate}</Text>
                    </View>
                    {
                        option.enableLabels && setTypeData(onLabel, num)
                    }
                </View>
            </Pressable>

            <Pressable style={[g.row,g.center, btnStyle]} onPress={onPressBtn}>
                <View style={[g.row,g.center, s.nowDate, backgroundViewStyle]}>
                    <View style={[g.row,g.center,{backgroundColor:'#ddd'},option.toDayBackgroundViewStyle,s.dateTextView]}>
                        <Text style={[s.dateFontSize,{color:selectDate === initDate.toString() ? option.selectDateColor : "#000", ...option.dateTextStyle, ...option.toDayTextStyle}]}>{initDate}</Text>
                    </View>
                    {
                        option.enableLabels && setTypeData(onLabel, num)
                    }
                </View>
            </Pressable>

            <Pressable style={[g.row,g.center, btnStyle]} onPress={onPressBtn}>
                <View style={[g.row,g.center, s.date, backgroundViewStyle]}>
                    <View style={[option.dateBackgroundViewStyle,s.dateTextView]}>
                        <Text style={[s.dateFontSize,{color:selectDate === initDate.toString() ? option.selectDateColor : "#000", ...option.dateTextStyle}]}>{initDate}</Text>
                    </View>
                    {
                        option.enableLabels && setTypeData(onLabel, num)
                    }
                </View>
            </Pressable>
        </>
    );
};

export default DateBtn;

const s = StyleSheet.create({
    overDate : {
        padding : 10
    },
    date : {
        padding : 10
    },
    nowDate : {
        backgroundColor:'#000'
    },
    dateTextView : {
        paddingVertical:'30%'
    }
});
