import React, {memo, useEffect, useRef, useState} from 'react';
import {Input as BaseInput} from 'react-native-elements';
import {FieldInputProps} from '~/components/elements/field-input/field-input.props';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {getFieldInputAttrs} from '~/components/elements/field-input/FieldInput.styled';
import {typography} from '~/theme';

export const FieldInput = memo(({containerStyle, isPassword, ...rest}: FieldInputProps) => {
  const inputRef = useRef(null);
  const spacingStyle = useSpacingStyle(rest);
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // https://github.com/facebook/react-native/issues/30123
    // @ts-ignore
    inputRef?.current?.setNativeProps({style: {fontFamily: typography.primary}});
  }, []);

  const onEyePress = () => {
    setIsHidden(!isHidden);
  };

  const renderPasswordIcon = () => {
    if (isPassword) {
      if (isHidden) {
        return {name: 'eye', type: 'antdesign', size: 20, onPress: onEyePress};
      }
      return {name: 'eyeo', type: 'antdesign', size: 20, onPress: onEyePress};
    }
    return undefined;
  };
  const passProps = {containerStyle: [containerStyle, spacingStyle], isFocused, ...rest};

  const handleOnChangeText = () => {};
  return (
    <BaseInput
      ref={inputRef}
      rightIcon={renderPasswordIcon()}
      onChangeText={handleOnChangeText}
      secureTextEntry={isPassword && isHidden}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...getFieldInputAttrs(passProps)}
    />
  );
});
