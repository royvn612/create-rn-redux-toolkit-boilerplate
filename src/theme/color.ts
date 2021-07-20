import {Platform} from 'react-native';
import {palette} from './palette';

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: 'rgba(0, 0, 0, 0)',
  primaryBackground: palette.fadedJade,
  secondaryBackground: '#EEF5F4',
  selectedLabel: '#89C6A8',
  disabledBackground: `${palette.outerSpace}33`, // Opacity 0.2

  shadow: Platform.select({ios: 'rgba(44, 65, 66, 0.1)', android: 'rgba(44, 65, 66, 0.8)'}),

  voidBackground: '#DCDCDC',
  /**
   * The main tinting color.
   */
  primary: palette.outerSpace,
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: palette.orangeDarker,
  /**
   * A subtle color used for borders and lines.
   */
  line: 'rgba(58, 79, 92, 0.2)',
  /**
   * The default color of text in many components.
   */
  text: palette.outerSpace,
  textSecondary: palette.blackSecondary,
  textLighter: palette.fadedJade,
  textReverse: `${palette.edward}`, // Opacity 0.4
  textLink: `${palette.blue}`,
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: palette.angry,

  unSelected: 'rgba(69, 118, 114, 0.1)',
};
