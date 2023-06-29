import React, {useContext} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import g from '../../../../style/Global.style';
import LabelList from './LabelList';
import { OptionContext } from '../../../../context/OptionContext';
import { CalendarsDateContext } from '../../../../context/CalendarsDateContext';
import { setDateBorder } from '../../../utils/utils';
import { moveDateEnum } from '../../../../type/compoent/date.d';

interface OverDateBtnProps {
	date : Date;
	label : string;
}

const OverDateBtn = ({date, label}: OverDateBtnProps) => {
	const {
		labels, pressOverDate, curDate
	} = useContext(CalendarsDateContext);
	
	const {
		enableLabels,
		onPressStyle,
		dateBorderViewStyle,
		dateBackgroundViewStyle,
	} = useContext(OptionContext);

	let dateBorder = setDateBorder();

	const dateText = date.getDate().toString();

	const onPress = () => {
		if(curDate.getMonth() <= date.getMonth()){
			pressOverDate(moveDateEnum.NEXT);
			return;
		}

		pressOverDate(moveDateEnum.PREV);
	}

	return (
		<Button btnStyle={onPressStyle} onPress={onPress}>
			<View style={[g.row,g.center, s.overDate, dateBorderViewStyle, dateBorder]}>
				<View style={[dateBackgroundViewStyle, s.dateTextView]}>
					<Text style={[s.text, g.dateFontSize]}>{dateText}</Text>
				</View>
					{
						enableLabels && <LabelList onLabel={label} labelList={labels}  />
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
