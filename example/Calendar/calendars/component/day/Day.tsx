import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import g from '../../../../style/Global.style';

interface componentNameProps {
	day : string;
}

const Day = ({day}: componentNameProps) => {
	return (
		<View style={[g.row,g.center]}>
			<View style={[g.column,g.center,s.container]}>
				<Text style={{fontSize : 15}}>{day}</Text>
			</View>
		</View> 
	);
};

export default Day;

const s = StyleSheet.create({
	container: {
        paddingTop:10,
        paddingBottom:10
    },
});
