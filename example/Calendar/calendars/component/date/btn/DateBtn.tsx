import React, {useContext} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import g from '../../../../style/Global.style';
import LabelList from './LabelList';
import { CalendarsDateContext } from '../../../../context/CalendarsDateContext';
import { OptionContext } from '../../../../context/OptionContext';
import { setDateBorder } from '../../../utils/utils';

interface DateBtnProps {
	date : Date;
	label : string;
	fomatDateText : string;
}

const DateBtn = ({date, label, fomatDateText}: DateBtnProps) => {
	const {
		pressDate, selectDate, labels
	} = useContext(CalendarsDateContext);
	
	const {
		enableLabels,
		selectDateColor,
		onPressStyle,
		dateBorderViewStyle,
		dateBackgroundViewStyle,
		dateTextStyle
	} = useContext(OptionContext);

	const defaultBorder = setDateBorder();
	const dateText = date.getDate().toString();
	const color = selectDate === dateText.toString() ? selectDateColor : "#000";

	const onPress = () => {
		pressDate(dateText, fomatDateText, label);
	}

	return (
		<Button btnStyle={onPressStyle} onPress={onPress}>
			<View style={[g.row,g.center, s.date, dateBorderViewStyle, defaultBorder]}>
				<View style={[dateBackgroundViewStyle, s.dateTextView]}>
					<Text style={[g.dateFontSize, {color, ...dateTextStyle}]}>{dateText}</Text>
				</View>
				{
						enableLabels && <LabelList onLabel={label} labelList={labels}  />
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
