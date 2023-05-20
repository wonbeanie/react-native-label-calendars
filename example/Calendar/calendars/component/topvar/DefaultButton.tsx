import React, {useContext} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ArrowButton, { ArrowButtonType } from './ArrowButton';
import g from '../../../style/Global.style';
import { OptionContext } from '../../../context/OptionContext';

interface DefaultButtonProps {
    onPress : ()=>void;
    direction : ArrowButtonType;
    sameDateCheck : boolean;
}

const DefaultButton = ({onPress, direction, sameDateCheck}: DefaultButtonProps) => {
    let option = useContext(OptionContext);
    let blinkCheck = option.disableMonthChange.prev && !sameDateCheck;

    if(blinkCheck){
        return <BlinkButton />;
    }
    else if(option.nextButton()){
        return option.nextButton() as JSX.Element;
    }
    else if(option.prevButton()){
        return option.prevButton() as JSX.Element;
    }

    return <ArrowButton onPress={onPress} type={direction} />
};

export default DefaultButton;

const BlinkButton = () => {
    return <View style={[g.row,g.center, s.blinkButton]} />;
}

const s = StyleSheet.create({
    blinkButton : {
        flex:2.5,
        padding:10
    }
});
