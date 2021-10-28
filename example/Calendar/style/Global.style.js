import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    centerText: {
        textAlign: 'center'
    },
    column: {
        flex:1,
        flexDirection:'column'
    },
    row: {
        flex:1,
        flexDirection:'row'
    },
    center: {
        alignItems:"center",
        justifyContent:'center'
    }
});