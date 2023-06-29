import React, {useContext} from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button';
import g from '../../../../style/Global.style';
import LabelList from './LabelList';
import { CalendarsDateContext } from '../../../../context/CalendarsDateContext';
import { OptionContext } from '../../../../context/OptionContext';
import { formatDate, setDateBorder } from '../../../utils/utils';

interface NowDateBtnProps {
	date : Date;
	label : string;
	fomatDateText : string;
}

const NowDateBtn = ({date, label, fomatDateText}: NowDateBtnProps) => {
	const {
		pressDate, selectDate, labels
	} = useContext(CalendarsDateContext);
	
	const {
		enableLabels,
		onPressStyle,
		toDayBorderViewStyle,
		toDayBackgroundViewStyle,
		selectDateColor,
		toDayTextStyle,
		dateTextStyle,
		toDayBorderWidth
	} = useContext(OptionContext);

	const defaultBorder = setDateBorder(toDayBorderWidth, "now");
	const dateText = date.getDate().toString();
	const color = selectDate === dateText.toString() ? selectDateColor : "#000";

	const onPress = () => {
		pressDate(dateText, fomatDateText, label);
	}

    return (
		<Button btnStyle={onPressStyle} onPress={onPress}>
			<View style={[g.row,g.center, s.nowDate, toDayBorderViewStyle, defaultBorder]}>
				<View style={[g.row,g.center, s.backgroundColor, toDayBackgroundViewStyle, s.dateTextView]}>
					<Text style={[g.dateFontSize, {color:color, ...dateTextStyle, ...toDayTextStyle}]}>{dateText}</Text>
				</View>
				{
					enableLabels && <LabelList onLabel={label} labelList={labels}  />
				}
			</View>
		</Button>
    );
};

export default NowDateBtn;

const s = StyleSheet.create({
    nowDate : {
        backgroundColor:'#000'
    },
	backgroundColor : {
		backgroundColor : '#ddd'
	},
    dateTextView : {
        paddingVertical:'30%'
    },
});
