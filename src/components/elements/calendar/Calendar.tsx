import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Calendar as BaseCalendar} from 'react-native-calendars';
import {Card, Col, Label, Row, Text} from '~/components/elements';
import {color, sharedStyles, THEME_NAMES, typography} from '~/theme';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {CalendarProps} from '~/components/elements/calendar/calendar.props';
import {styledPropsTheming} from '~/utils/styled-props-theming';

const themes = {
  [THEME_NAMES.LIGHT]: {
    arrowColor: color.primaryBackground,
    // backgroundColor: '#ffffff',
    // calendarBackground: '#ffffff',
    textSectionTitleColor: color.text,
    // textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: color.primaryBackground,
    // selectedDayTextColor: 'blue',
    // todayTextColor: 'blue',
    dayTextColor: color.text,
    textDisabledColor: color.textReverse,
    // dotColor: 'blue',
    // selectedDotColor: 'blue',
    // disabledArrowColor: 'blue',
    monthTextColor: color.text,
    // indicatorColor: 'blue',
    textDayFontFamily: typography.primary,
    textMonthFontFamily: typography.primary,
    textDayHeaderFontFamily: typography.primary,
    textDayFontWeight: '400',
    textMonthFontWeight: '600',
    // textDayHeaderFontWeight: '300',
    textDayFontSize: 14,
    textMonthFontSize: 14,
    // textDayHeaderFontSize: 16
  },
};

const {themeBy} = styledPropsTheming();
const theme = themeBy(themes);

const styles = StyleSheet.create({
  annotationWrapper: {width: '50%'},
});

export const Calendar = memo(
  ({
    containerStyle,
    onDayPress,
    markedDates,
    footer,
    selectedDayTextColor = color.palette.white,
    headerTitle = 'Calendar',
    annotations,
    card = true,
    ...rest
  }: CalendarProps) => {
    const spacingStyle = useSpacingStyle(rest);

    const Container = card ? Card : Col.X;
    const Footer = footer || null;
    return (
      <Container style={[spacingStyle, containerStyle]} shadow>
        <Col.X>
          <Text variant="subheading" text={headerTitle} textAlign="center" mb={2} mt={1} />
          <Row.LR px={3} style={sharedStyles.flexWrap}>
            {annotations &&
              annotations?.length > 0 &&
              annotations.map(a => (
                <Row key={a.label} mt={2} style={styles.annotationWrapper}>
                  <Label variant="annotation" iconProps={{color: a.color}} text={a.label} />
                </Row>
              ))}
          </Row.LR>
        </Col.X>
        <BaseCalendar
          theme={theme}
          onDayPress={onDayPress}
          enableSwipeMonths
          // @ts-ignore
          markedDates={markedDates}
          {...rest}
        />
        {/* @ts-ignore */}
        {Footer && <Footer />}
      </Container>
    );
  },
);
