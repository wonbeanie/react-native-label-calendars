# React Native Label Calendars 🗓️
[![Version](https://img.shields.io/npm/v/react-native-label-calendars)](https://www.npmjs.com/package/react-native-label-calendars)
<!-- [![Version](https://img.shields.io/npm/dw/react-native-label-calendars)](https://www.npmjs.com/package/react-native-label-calendars) -->

This module includes various customizable **React-Native** calendar components.

The package is both **Android** and **iOS** compatible.

## Try it out

You can run example module by performing these steps:

```
$ git clone git@github.com:wonbeanie/react-native-label-calendars.git
$ cd example
$ npm install
$ react-native run-android
```

## Installation

```
$ npm install --save react-native-label-calendars
```

## Usage

`import Calendars from 'react-native-label-calendars';`

All parameters for components are optional. By default the month of current local date will be displayed.

### Calendars

<kbd>
  <img src="https://github.com/wonbeanie/react-native-label-calendars/blob/develop/TestImage.png?raw=true">
</kbd>

#### Default parameters

```javascript
<Calendars
    onLabelData={[
        {
            date : "2021-11-03",
            onLabel : ["Gameming"]
        },
        {
            date : "2021-11-05",
            onLabel : ["Jumping"]
        }
    ]}
    labels={[
        {
            name : 'Gameming',
            color : "#39D291"
        },
        {
            name : 'Jumping',
            color : "#40BADC"
        },
    ]}
    option={
        //This is the display button of the calendar move button.
        disableMonthChange : {
            next : false,
            prev : false
        },
        //This is the label display button.
        enableLabels : true,
        //This is the option to modify the selected date color.
        selectDateColor : "#0077CC",
        //This is a handler used to select a date.
        onSelectDate : (fullDate : string, label ?: string)=>{console.log(`Select Date ${fullDate}`);},
        //It is a title format that shows the year and month.
        titleFormat : "{month} {year}",
        //This is the day of the week display format.
        weekLangFormat : ["Mon","Tue","Wed","Thu","Fir","Sat","Sun"],
        //This is the day of the month display format.
        monthLangFormat : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        //It's a custom component that goes back.
        prevButton : ()=>false,
        //It's a custom component that goes forward.
        nextButton : ()=>false,
        //Customized title View style.
        titleViewStyle : {},
        //Customized title Text style.
        titleStyle : {},
        //Customized date Pressable style.
        onPressStyle : {},
        //Customized toDay Text style.
        toDayTextStyle : {},
        //Customized date Text style.
        dateTextStyle : {},
        //Customized toDay View style.
        toDayViewStyle : {},
        //Customized toDay Border View style.
        toDayBorderViewStyle : {},
        //Customized toDay Background View style.
        toDayBackgroundViewStyle : {},
        //Customized date Border View style.
        dateBorderViewStyle : {},
        //Customized date Background View style.
        dateBackgroundViewStyle : {},
        //Customizing the thickness of the toDay border.
        toDayBorderWidth : 3,
        //It's a backward handler function.
        onNextPress : (nextTitle : string)=>{console.log(`Next Title ${nextTitle}`);},
        //This is the forward handler function.
        onPrevPress : (prevTitle : string)=>{console.log(`Prev Title ${prevTitle}`);},
    }
/>
```

### Props
|Prop Name|Type|Essential|Description|
|---|---|---|---|
|onLabelData|Array<[LabelData](#LabelData)>|true|Date Label Data|
|labels|Array<[Label](#Label)>|true|Label List Data|
|option|Object|false|{}|options|

### Option Props
|Option Name|Type|Description|
|---|---|---|
|[disableMonthChange](#disableMonthChange)|`Object`|This is the display button of the calendar move button.|
|[enableLabels](#enableLabels)|`boolean`|This is the label display button.|
|[selectDateColor](#selectDateColor)|`string`|This is the option to modify the selected date color.|
|[onSelectDate](#onSelectDate)|`Function`|This is a handler used to select a date.|
|[titleFormat](#titleFormat)|`string`|It is a title format that shows the year and month.|
|[weekLangFormat](#weekLangFormat)|`Array<string>`|This is the day of the week display format.|
|[monthLangFormat](#monthLangFormat)|`Array<string>`|This is the day of the month display format.|
|[prevButton](#prevButton)|`Function`|It's a custom component that goes back.|
|[nextButton](#nextButton)|`Function`|It's a custom component that goes forward.|
|titleViewStyle|`ViewStyle`|Customized title View style.|
|titleStyle|`TextStyle`|Customized title Text style.|
|onPressStyle|`ViewStyle`|Customized date Pressable style.|
|toDayTextStyle|`TextStyle`|Customized toDay Text style.|
|dateTextStyle|`TextStyle`|Customized date Text style.|
|toDayViewStyle|`ViewStyle`|Customized toDay View style.|
|toDayBorderViewStyle|`ViewStyle`|Customized toDay Border View style.|
|toDayBackgroundViewStyle|`ViewStyle`|Customized toDay Background View style.|
|dateBorderViewStyle|`ViewStyle`|Customized date Border View style.|
|dateBackgroundViewStyle|`ViewStyle`|Customized date Background View style.|
|[toDayBorderWidth](#toDayBorderWidth)|`number`|Customizing the thickness of the toDay border.|
|[onNextPress](#onNextPress)|`Function`|It's a backward handler function.|
|[onPrevPress](#onPrevPress)|`Function`|This is the forward handler function.|

#### disableMonthChange
This is the display button of the calendar move button.
|option|Type|Default|Description|
|---|---|---|---|
|next|`boolean`|true|If True, the move button will be activated next month.|
|prev|`boolean`|true|If True, the move button will be activated last month.|
```javascript
disableMonthChange : {
    next : false,
    prev : false
}
```

#### enableLabels
This is the label display button.
|option|Type|Default|Description|
|---|---|---|---|
|enableLabels|`boolean`|true|If True, the label calendar is activated.|
```javascript
enableLabels : true
```

#### selectDateColor
This is the option to modify the selected date color.
|option|Type|Default|Description|
|---|---|---|---|
|selectDateColor|`string`|"#0077CC"|Date color when selecting a date.|
```javascript
selectDateColor : "#0077CC"
```

#### onSelectDate
This is a handler used to select a date.
|option|Type|Default|Description|
|---|---|---|---|
|onSelectDate|`Function`|( fullDate : string)=>void|This is a handler used to select a date.|
|fullDate|`string`|yyyy-mm-dd|Returns the value of the selected date.|
|label|`string`|undefined|Returns the label for the selected date.|

```javascript
onSelectDate : (fullDate : string, label ?: string) => {
    console.log(`Select Date ${fullDate}`);
}
```

#### titleFormat
It is a title format that shows the year and month.
|option|Type|Default|Description|
|---|---|---|---|
|titleFormat|`string`|"{month} {year}"|There are a total of three types: "{month}", "{year}", and "{koMonth}".|

```javascript
titleFormat : "{month} {year}"
```

#### weekLangFormat
This is the day of the week display format.
|option|Type|Default|Description|
|---|---|---|---|
|weekLangFormat|`Array<string>`|["Mon","Tue","Wed","Thu","Fir","Sat","Sun"]|0 index is Monday.|

```javascript
weekLangFormat : ["Mon","Tue","Wed","Thu","Fir","Sat","Sun"]
```

#### monthLangFormat
This is the day of the month display format.
|option|Type|Default|Description|
|---|---|---|---|
|monthLangFormat|`Array<string>`|["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]|0 index is January.|

```javascript
monthLangFormat : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
```

#### prevButton
It’s a custom component that goes back.
|option|Type|Default|Description|
|---|---|---|---|
|prevButton|`Function`|()=>false|When returning an element, the back button changes.|

```javascript
prevButton : ()=>{
    return (
        <View>
            <Text>Prev</Text>
        <View/>
    )
}
```

#### nextButton
It’s a custom component that goes forward.
|option|Type|Default|Description|
|---|---|---|---|
|nextButton|`Function`|()=>false|The forward button changes when returning the element.|

```javascript
nextButton : ()=>{
    return (
        <View>
            <Text>Next</Text>
        <View/>
    )
}
```

#### toDayBorderWidth
Customizing the thickness of the toDay border.
|option|Type|Default|Description|
|---|---|---|---|
|toDayBorderWidth|`number`|3|You can modify the width of the border marked on today's date.|

```javascript
toDayBorderWidth : 3
```

#### onPrevPress
It’s a backward handler function.
|option|Type|Default|Description|
|---|---|---|---|
|onPrevPress|`Function`|(prevTitle : string)=>{console.log('Prev Title ${prevTitle}');}||
|prevTitle|`string`|yyyy-mm-dd|Returns the value of the selected date.|

```javascript
onPrevPress : (prevTitle : string) => {
    console.log(`Prev Title ${prevTitle}`);
}
```

#### onNextPress
It’s a backward handler function.
|option|Type|Default|Description|
|---|---|---|---|
|onNextPress|`Function`|(nextTitle : string)=>{console.log('Next Title ${nextTitle}');}||
|nextTitle|`string`|yyyy-mm-dd|Returns the value of the selected date.|

```javascript
onNextPress : (nextTitle : string) => {
    console.log(`Next Title ${nextTitle}`);
}
```

### Types
#### LabelData
This is a list of date data to be labeled.
|option|Type|Description|
|---|---|---|
|date|`string`|It is a date in the form of yyyy-mm-ddor Date.|
|onLabel|`Array<string>`|This is the label that should be displayed in the date.|
```javascript
{
    date : "2021-11-03",
    onLabel : ["Runner"]
}
```

#### Label
This is the label list to be displayed.
|option|Type|Description|
|---|---|---|
|name|`string`|It's a name that goes inside onLabel.|
|color|`string`|Color labels to be displayed in the calendar.|
```javascript
{
    name : "Runner",
    color : "#000"
}
```
