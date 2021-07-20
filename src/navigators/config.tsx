import React from 'react';
import {Icon} from '~/components/elements';
import {color} from '~/theme';

export const defaultStackScreenOptions = {
  headerBackTitleVisible: false,
  headerStyle: {shadowColor: 'transparent', backgroundColor: color.secondaryBackground},
  headerBackImage: () => <Icon name="ios-chevron-back" type="ionicon" color={color.primary} size={30} ml={2} />,
};
