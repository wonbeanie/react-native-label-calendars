/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
 
import Calendars from './Calendar/Calendars';
// import Calendars from 'react-native-label-calendars';
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };

   const getDate = (day : string) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    month = Number(month) < 10 ? "0" + month : month;
    return year + "-" + month + "-" + day;
 }
 
   let onTypeData = [
     {
       date : getDate("12"),
       onLabel : ["Gameming"]
     },
     {
       date : getDate("13"),
       onLabel : ["Gameming"]
     },
     {
       date : getDate("15"),
       onLabel : ["Jumping","View"]
     },
     {
       date : getDate("18"),
       onLabel : ["Eatting","Running","Gameming","Jumping","View"]
     },
     {
       date : getDate("23"),
       onLabel : ["Eatting","Running"]
     }
   ];
 
   let labels = [
     {
         name : 'Eatting',
         color : "#E85567"
     },
     {
         name : 'Running',
         color : "#F79937"
     },
     {
         name : 'Gameming',
         color : "#39D291"
     },
     {
         name : 'Jumping',
         color : "#40BADC"
     },
     {
         name : 'View',
         color : "#000"
     }
   ];
 
   return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{backgroundColor:"white"}}>
        
        <View style={{padding: 10}}>
          <Calendars labels={labels} onLabelData={onTypeData} />
        </View>

      </ScrollView>
    </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 