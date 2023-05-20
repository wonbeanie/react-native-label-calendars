import { initDateType } from "../../Calendars";
import { optionType, sizeType } from "../../Calendars.d";

export const formatDate = (data : Date) => {
    let year = data.getFullYear();
    let month = (data.getMonth()+1).toString();
    let date = data.getDate().toString();
    if(month.toString().length < 2){
        month = "0"+month;
    }

    if(date.toString().length < 2){
        date = "0"+date;
    }

    return `${year}-${month}-${date}`;
}

export const setDateBorder = (size : sizeType = "Big", borderWidth ?: number, type ?: string) => {
    let paddingMax = 10;
    let borderWidthDefault = 3;
    borderWidth = 0;

    if(size === "Small"){
        paddingMax = 5;
        borderWidthDefault = 2;
    }

    if(type){
        borderWidth = borderWidth ? borderWidth : borderWidthDefault;
    }

    let borderStyle = {
        borderViewStyle : {
            padding: borderWidth
        },
        backgroundViewStyle : {
            padding: paddingMax-borderWidth
        }
    };
    
    return borderStyle;
}

export const formatDay = (day:number) => {
    let days = [6,0,1,2,3,4,5];
    return days[day];
}


export const sameDate = (base : Date, target : Date) => {
    if(base.getFullYear() === base.getFullYear()){
        if(base.getMonth() === base.getMonth()){
            return false;
        }
    }
    return true;
}