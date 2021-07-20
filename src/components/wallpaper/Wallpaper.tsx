import React from 'react';
import {flatten} from 'lodash';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {presets} from './wallpaper.presets';
import {WallpaperProps, wallpapers} from './wallpaper.props';
import {color} from '~/theme';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const {style: styleOverride, backgroundImage, name, gradientColors} = props;
  // assemble the style
  const preset = name ? 'image' : 'default';
  const presetToUse = presets[preset];
  const styles = flatten([presetToUse, styleOverride]);

  if (preset === 'default') {
    const colors = gradientColors || [color.secondaryBackground, `${color.secondaryBackground}00`];
    return <LinearGradient colors={colors} style={styles} />;
  }

  // figure out which image to use
  const source = backgroundImage || wallpapers[name!] || wallpapers.bg;

  return <Image source={source} style={styles} />;
}
