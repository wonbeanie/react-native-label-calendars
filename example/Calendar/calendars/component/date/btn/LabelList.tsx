import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface LabelListProps {
	labelList : any;
	onLabel : string;
}

const LabelList = ({onLabel, labelList}: LabelListProps) => {
	return (
		<View style={[s.container, s.dateLabelView]}>
			{
				labelList.map((data,num)=>{
					return onLabel.indexOf(data.name) !== -1 && <View style={[{backgroundColor:data.color}, s.dateLabel]} />
				})
			}
		</View>
	);
};

export default LabelList;

const s = StyleSheet.create({
	container: {
		position:'absolute',
		width:'100%',
		flexDirection:'row',
		justifyContent:'center'
	},
	dateLabelView : {
        height:5,
        bottom:6
    },
	dateLabel : {
        width:5,
        borderRadius:5,
        marginRight:2
    },
});
