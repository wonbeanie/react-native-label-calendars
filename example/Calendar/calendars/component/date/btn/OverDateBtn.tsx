import React, {useContext} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import g from '../../../../style/Global.style';
import LabelList from './LabelList';
import { OptionContext } from '../../../../context/OptionContext';
import { CalendarsDateContext } from '../../../../context/CalendarsDateContext';
import { setDateBorder } from '../../../utils/utils';

interface OverDateBtnProps {
	text : string;
	label : string;
}

const OverDateBtn = ({text, label}: OverDateBtnProps) => {
	const {
		labels, pressOverDate
	} = useContext(CalendarsDateContext);
	
	const {
		enableLabels,
		onPressStyle,
		dateBorderViewStyle,
		dateBackgroundViewStyle,
	} = useContext(OptionContext);

	let dateBorder = setDateBorder();

	return (
		<Button btnStyle={onPressStyle} onPress={pressOverDate}>
			<View style={[g.row,g.center, s.overDate, dateBorderViewStyle, dateBorder]}>
				<View style={[dateBackgroundViewStyle, s.dateTextView]}>
					<Text style={[s.text, g.dateFontSize]}>{text}</Text>
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
