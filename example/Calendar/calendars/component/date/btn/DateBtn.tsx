import * as React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button';
import g from '../../../../style/Global.style';
import LabelList from './LabelList';
import { labelType } from '../../../../Calendars';
import { pressDateType } from '../../../../type/compoent/date';

interface DateBtnProps {
	text : string;
	enableLabels : boolean;
	label : string;
	labelList : labelType[];
	onPress: pressDateType;
	styles : {
		dateBorder: ViewStyle;
		defaultBorder : ViewStyle;
		dateBackground : ViewStyle;
		dateText : ViewStyle;
		color : string;
		btnStyle : ViewStyle;
	}
}

const DateBtn = (props: DateBtnProps) => {
	const {
		text, enableLabels, styles,
		label, labelList, onPress
	} = props;

	const {
		dateBorder, defaultBorder, dateBackground,
		dateText, color, btnStyle
	} = styles;

	return (
		<Button btnStyle={btnStyle} onPress={onPress}>
			<View style={[g.row,g.center, s.date, dateBorder, defaultBorder]}>
				<View style={[dateBackground, s.dateTextView]}>
					<Text style={[g.dateFontSize, {color:color, ...dateText}]}>{text}</Text>
				</View>
				{
						enableLabels && <LabelList onLabel={label} labelList={labelList}  />
					}
			</View>
		</Button>
	);
};

export default DateBtn;

const s = StyleSheet.create({
	date : {
		padding:10
	},
	dateTextView : {
        paddingVertical:'30%'
    },
	text : {
		color:"#c0c0c0"
	}
});
