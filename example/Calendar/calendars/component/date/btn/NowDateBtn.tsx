import React, {useContext} from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button';
import g from '../../../../style/Global.style';
import LabelList from './LabelList';
import { CalendarsDateContext } from '../../../../context/CalendarsDateContext';
import { OptionContext } from '../../../../context/OptionContext';
import { formatDate, setDateBorder } from '../../../utils/utils';

interface NowDateBtnProps {
	text : string;
	label : string;
	fomatDateText : string;
}

const NowDateBtn = ({text, label, fomatDateText}: NowDateBtnProps) => {
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
	const color = selectDate === text.toString() ? selectDateColor : "#000";

	const onPress = () => {
		pressDate(text, fomatDateText);
	}

    return (
		<Button btnStyle={onPressStyle} onPress={onPress}>
			<View style={[g.row,g.center, s.nowDate, toDayBorderViewStyle, defaultBorder]}>
				<View style={[g.row,g.center, s.backgroundColor, toDayBackgroundViewStyle, s.dateTextView]}>
					<Text style={[g.dateFontSize, {color:color, ...dateTextStyle, ...toDayTextStyle}]}>{text}</Text>
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
