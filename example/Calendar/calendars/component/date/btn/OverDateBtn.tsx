import * as React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button';
import g from '../../../../style/Global.style';
import LabelList from './LabelList';
import { labelType } from '../../../../Calendars';
import { pressOverDateType } from '../../../../type/compoent/date';

interface OverDateBtnProps {
	text : string;
	enableLabels : boolean;
	label : string;
	labelList : labelType[];
	onPress : pressOverDateType;
	styles : {
		dateBorder: ViewStyle;
		defaultBorder : ViewStyle;
		dateBackground : ViewStyle;
		btnStyle : ViewStyle;
	}
}

const OverDateBtn = (props: OverDateBtnProps) => {
	const {
		text, enableLabels, styles,
		label, labelList, onPress
	} = props;
	
	const {
		dateBorder, defaultBorder, dateBackground,
		btnStyle
	} = styles;
	

	return (
		<Button btnStyle={btnStyle} onPress={onPress}>
			<View style={[g.row,g.center, s.overDate, dateBorder, defaultBorder]}>
				<View style={[dateBackground, s.dateTextView]}>
					<Text style={[s.text, g.dateFontSize]}>{text}</Text>
				</View>
					{
						enableLabels && <LabelList onLabel={label} labelList={labelList}  />
					}
			</View>
		</Button>
	);
};

export default OverDateBtn;

const s = StyleSheet.create({
	overDate : {
		padding:10
	},
	dateTextView : {
        paddingVertical:'30%'
    },
	text : {
		color:"#c0c0c0"
	}
});
