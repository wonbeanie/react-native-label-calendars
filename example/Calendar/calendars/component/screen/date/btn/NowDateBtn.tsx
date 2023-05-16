import * as React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button';
import g from '../../../../../style/Global.style';
import LabelList from './LabelList';

interface NowDateBtnProps {
	text : string;
	enableLabels : boolean;
	styles : {
		dateBorder: ViewStyle;
		defaultBorder : ViewStyle;
		toDayBackground : ViewStyle;
		dateText : ViewStyle;
		toDayText : ViewStyle;
		color : string;
	}
}

const NowDateBtn = (props: NowDateBtnProps) => {
	const {
		text, enableLabels, styles
	} = props;

	const {
		dateBorder, defaultBorder, toDayBackground,
		dateText, toDayText, color
	} = styles;

    return (
		<Button btnStyle={{}} onPress={()=>{}}>
			<View style={[g.row,g.center, s.nowDate, dateBorder, defaultBorder]}>
				<View style={[g.row,g.center, s.backgroundColor, toDayBackground, s.dateTextView]}>
					<Text style={[g.dateFontSize, {color:color, ...dateText, ...toDayText}]}>{text}</Text>
				</View>
				{
					enableLabels && <LabelList onLabel='' labelList={[]}  />
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
