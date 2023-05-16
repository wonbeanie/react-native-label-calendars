import * as React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button';
import g from '../../../../../style/Global.style';
import LabelList from './LabelList';

interface DateBtnProps {
	text : string;
	enableLabels : boolean;
	styles : {
		dateBorder: ViewStyle;
		defaultBorder : ViewStyle;
		dateBackground : ViewStyle;
		dateText : ViewStyle;
		color : string;
	}
}

const DateBtn = (props: DateBtnProps) => {
	const {
		text, enableLabels, styles
	} = props;

	const {
		dateBorder, defaultBorder, dateBackground,
		dateText, color
	} = styles;

	return (
		<Button btnStyle={{}} onPress={()=>{}}>
			<View style={[g.row,g.center, s.date, dateBorder, defaultBorder]}>
				<View style={[dateBackground, s.dateTextView]}>
					<Text style={[g.dateFontSize, {color:color, ...dateText}]}>{text}</Text>
				</View>
				{
						enableLabels && <LabelList onLabel='' labelList={[]}  />
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
