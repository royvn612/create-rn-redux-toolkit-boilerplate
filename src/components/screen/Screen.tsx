import * as React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from './screen.props';
import {isNonScrolling, offsets, presets} from './screen.presets';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const spacingStyle = useSpacingStyle(props);
  const preset = presets.fixed;
  const {unsafe, keyboardOffset, style: style1, statusBar, backgroundColor, children} = props;
  const style = style1 || {};
  const backgroundStyle = backgroundColor ? {backgroundColor} : {};
  const insetStyle = {paddingTop: unsafe ? 0 : insets.top};

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || 'none']}>
      <StatusBar barStyle={statusBar || 'light-content'} />
      <View style={[preset.inner, style, insetStyle, spacingStyle]}>{children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const spacingStyle = useSpacingStyle(props);
  const preset = presets.scroll;
  const {
    unsafe,
    keyboardOffset,
    style: style1,
    statusBar,
    keyboardShouldPersistTaps,
    backgroundColor,
    hasFooter,
    children,
  } = props;
  const contentStyle = hasFooter ? {flexGrow: 1} : {};
  const style = style1 || {};
  const backgroundStyle = backgroundColor ? {backgroundColor} : {};
  const insetStyle = {paddingTop: unsafe ? 0 : insets.top};

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || 'none']}>
      <StatusBar barStyle={statusBar || 'light-content'} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, contentStyle, style, spacingStyle]}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}>
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  const {preset} = props;
  if (isNonScrolling(preset)) {
    return <ScreenWithoutScrolling {...props} />;
  }
  return <ScreenWithScrolling {...props} />;
}
