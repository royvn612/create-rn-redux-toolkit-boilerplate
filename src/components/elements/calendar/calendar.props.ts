import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {CalendarProps as BaseCalendarProps} from 'react-native-calendars';
import {ColProps} from '~/components/elements';

export interface MarkedDates {
  [date: string]: {
    selected?: boolean;
    selectedColor?: string;
    marked?: boolean;
    dotColor?: string;
    disableTouchEvent?: boolean;
    customStyles?: any;
  };
}

export type CalendarProps = BaseCalendarProps &
  ColProps & {
    containerStyle?: StyleProp<ViewStyle>;
    card?: boolean;
    headerTitle?: string;
    annotations?: {label: string; color: string}[];
    markedDates?: MarkedDates;
    selectedDayTextColor?: string;
    footer?: React.ReactNode;
  };
