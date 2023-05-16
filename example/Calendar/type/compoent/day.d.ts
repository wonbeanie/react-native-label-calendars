export type theWeekLangFormatType = string[];


export type dateListType = Array<weekListType>;
export type weekListType = Array<collDateType>;
export type collDateType = {
    date: Date;
    otherDate: boolean;
};