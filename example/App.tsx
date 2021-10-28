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
import { Calendar } from 'react-native-calendars';
 
 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
 
 import Calendars from './Calendar/Calendars';
//  import CalendarsView from './CalendarView/Calendars';
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   let onTypeData = [
     {
       date : "2021-03-26",
       onLabel : ["Gameming"]
     },
     {
       date : "2021-03-31",
       onLabel : ["Gameming"]
     },
     {
       date : "2021-03-25",
       onLabel : ["Jumping","View"]
     },
     {
       date : "2021-03-22",
       onLabel : ["Eatting","Running","Gameming","Jumping","View"]
     },
     {
       date : "2021-04-01",
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
     },
   ];
 
   return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>

        <View style={{flex:1,flexDirection:"row"}}>
            <View style={{flex:3,backgroundColor:"blue"}} />
            <View style={{flex:4}}>
              <Calendars labels={labels} onLabelData={onTypeData}/>
            </View>
            <View style={{flex:3,backgroundColor:"yellow"}} />
        </View>

        <View style={{flex:1,flexDirection:"row"}}>
            <View style={{flex:2,backgroundColor:"blue"}} />
            <View style={{flex:6}}>
              <Calendars labels={labels} onLabelData={onTypeData}/>
            </View>
            <View style={{flex:2,backgroundColor:"yellow"}} />
        </View>

        <View style={{flex:1,flexDirection:"row"}}>
            <View style={{flex:1,backgroundColor:"blue"}} />
            <View style={{flex:8}}>
              <Calendars labels={labels} onLabelData={onTypeData}/>
            </View>
            <View style={{flex:1,backgroundColor:"yellow"}} />
        </View>
        <Calendars labels={labels} onLabelData={onTypeData}/>

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
 