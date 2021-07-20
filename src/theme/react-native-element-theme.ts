import {typography} from '~/theme/typography';
import {color} from '~/theme/color';
import {componentPaddingX, componentPaddingY} from '~/theme/spacing';

export const uiTheme = {
  Text: {
    style: [
      {
        fontFamily: typography.primary,
        color: color.text,
        fontSize: 14,
        fontWeight: '400',
      },
    ],
  },
  Button: {
    buttonStyle: [{borderRadius: 8, borderWidth: 0}],
    titleStyle: [{fontFamily: typography.primary, color: color.palette.white, fontSize: 14, fontWeight: '600'}],
    loadingProps: {color: 'white'},
    disabledStyle: [{backgroundColor: color.disabledBackground}],
    disabledTitleStyle: [{color: color.palette.white}],
  },
  Card: {
    containerStyle: [
      {
        borderRadius: 16,
        borderWidth: 0,
        margin: 0,
        paddingHorizontal: componentPaddingX,
        paddingVertical: componentPaddingY,
      },
    ],
  },
  Overlay: {
    overlayStyle: [
      {
        borderRadius: 16,
        borderWidth: 0,
        paddingHorizontal: componentPaddingX,
        paddingVertical: componentPaddingY,
      },
    ],
  },
  Divider: {
    style: [
      {
        backgroundColor: color.line,
        height: 1,
      },
    ],
  },
  Icon: {
    size: 30,
  },
  Input: {
    containerStyle: [{paddingHorizontal: 0}],
    inputContainerStyle: [
      {
        borderBottomWidth: 1,
        borderColor: color.textReverse,
        paddingHorizontal: componentPaddingX,
      },
    ],
    inputStyle: [{fontSize: 14}],
  },
  Tab: {
    indicatorStyle: [{backgroundColor: color.primaryBackground}],
  },
  TabItem: {
    titleStyle: [{color: color.disabledBackground, textTransform: 'none'}],
    buttonStyle: [{borderBottomWidth: 2, borderBottomColor: color.disabledBackground}],
    containerStyle: [{backgroundColor: 'transparent'}],
  },
  SearchBar: {
    containerStyle: [
      {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: 0,
      },
    ],
    inputContainerStyle: [
      {
        backgroundColor: color.palette.white,
        borderRadius: 30,
        borderWidth: 0.5,
        borderBottomWidth: 0.5,
      },
    ],
    inputStyle: [{fontSize: 14, marginLeft: 5}],
    searchIcon: {name: 'search', type: 'feather', size: 20},
  },
  ListItem: {
    containerStyle: [{paddingHorizontal: 0}],
  },
  Chip: {
    titleStyle: [{fontSize: 14}],
    buttonStyle: [{backgroundColor: color.primaryBackground}],
  },
};
