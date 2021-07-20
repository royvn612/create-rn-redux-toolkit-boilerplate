import {ImageStyle} from 'react-native';

/**
 * All wallpaper will start off looking like this.
 */
const BASE: ImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

/**
 * All the variations of wallpaper styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default wallpaper styles.
   */
  default: {...BASE},
  image: {
    ...BASE,
    resizeMode: 'cover',
    width: null,
    height: null,
  } as unknown as ImageStyle,
};

/**
 * A list of preset names.
 */
export type WallpaperPresets = keyof typeof presets;
