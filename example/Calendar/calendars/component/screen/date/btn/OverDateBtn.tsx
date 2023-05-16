import * as React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button';
import g from '../../../../../style/Global.style';
import LabelList from './LabelList';

interface OverDateBtnProps {
	text : string;
	enableLabels : boolean;
	styles : {
		dateBorder: ViewStyle;
		defaultBorder : ViewStyle;
		dateBackground : ViewStyle;
	}
}

const OverDateBtn = (props: OverDateBtnProps) => {
	const {
		text, enableLabels, styles
	} = props;
	
	const {
		dateBorder, defaultBorder, dateBackground
	} = styles;
	

	return (
		<Button btnStyle={{}} onPress={()=>{}}>
			<View style={[g.row,g.center, s.overDate, dateBorder, defaultBorder]}>
				<View style={[dateBackground, s.dateTextView]}>
					<Text style={[s.text, g.dateFontSize]}>{text}</Text>
				</View>
					{
						enableLabels && <LabelList onLabel='' labelList={[]}  />
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
