import {ImageStyle, StyleProp} from 'react-native';
import {WallpaperPresets} from './wallpaper.presets';

export const wallpapers = {
  'boarding-bg1': require('./boarding-bg1.png'),
  'boarding-bg2': require('./boarding-bg2.png'),
  'boarding-bg3': require('./boarding-bg3.png'),
  'boarding-bg4': require('./boarding-bg4.png'),
  'boarding-bg5': require('./boarding-bg5.png'),
  consent: require('./consent.png'),
  bg: require('./bg.png'),
};

export interface WallpaperProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ImageStyle>;

  /**
   * An optional background image to override the default image.
   */
  backgroundImage?: string;

  /**
   * One of the different types of wallpaper presets.
   */
  preset?: WallpaperPresets;
  name?: keyof typeof wallpapers;
  gradientColors?: (string | number)[];
}
