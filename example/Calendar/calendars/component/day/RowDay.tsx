import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import g from '../../../style/Global.style';
import Day from './Day';
import { theWeekLangFormatType } from '../../../type/compoent/day';

interface RowDayProps {
	theWeekList : theWeekLangFormatType;
}

const RowDay = ({theWeekList}: RowDayProps) => {
	return (
		<View style={[g.row, s.container]}>
			{
				theWeekList.map((data,num)=>{
					return <Day day={data} />
				})
			}
		</View>
	);
};

export default RowDay;

const s = StyleSheet.create({
  	container: {
		flex: 2,
	}
});
