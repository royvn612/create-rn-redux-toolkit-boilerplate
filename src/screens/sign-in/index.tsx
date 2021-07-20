import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import {BottomSafeAreaView, Button, Col, Divider, FieldInput, Icon, Screen, Text, Wallpaper} from '~/components/elements';
import {color} from '~/theme';
import {useInput, useNotification, useRequestState} from '~/hooks';
import {AppDispatch} from '~/redux/root-store';
import {loginByEmail, LoginByEmailParams, socialLogin} from '~/redux/auth/thunk';
import AppError from '~/utils/error-handler';
import {SOCIAL_LOGIN_PLATFORMS} from '~/constants';
import {appConfig} from '~/config';

const FormField = styled(Col)``;
const FieldLabel = styled(Text).attrs({weight: 'semiBold', mb: 2})``;

export const SignInScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {addValidationMessage, addMessage} = useNotification(dispatch);
  const {loading: loginLoading} = useRequestState(loginByEmail);
  const {loading: socialLoginLoading} = useRequestState(socialLogin);
  const loading = loginLoading || socialLoginLoading;

  const rules = {
    username: {presence: true},
    password: {presence: true},
  };
  const {inputs, setInputs, validation} = useInput({} as LoginByEmailParams['data'], {rules});

  const handleSignIn = async () => {
    const errors = validation.getErrors();
    if (errors) {
      addValidationMessage(errors);
      return;
    }
    await dispatch(loginByEmail({data: inputs}));
  };
  const handleSignInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const googleUserInfo = await GoogleSignin.signIn();

      await dispatch(
        socialLogin({
          data: {
            provider: SOCIAL_LOGIN_PLATFORMS.GOOGLE,
            token: googleUserInfo.idToken || '',
            // @ts-ignore
            clientId: appConfig.googleAuth.webClientId[Platform.OS],
          },
        }),
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        const appErr = new AppError(error);
        addMessage('Google Sign In error', appErr.userMsg);
      }
    }
  };

  return (
    <Col.X>
      <Wallpaper />
      <Screen px="screen" preset="scroll" unsafe>
        <Col.X>
          <Text text="Sign In" variant="heading" mt={7} mb={3} />
          <Text text="Please sign in to continue using our app" color={color.textSecondary} mb={6} />
          <FormField>
            <FieldLabel text="Email Address" />
            <FieldInput
              autoCapitalize="none"
              placeholder="Enter email address"
              onChangeText={value => setInputs({username: value})}
            />
          </FormField>
          <FormField>
            <FieldLabel text="Password" />
            <FieldInput
              autoCapitalize="none"
              placeholder="Enter your password"
              isPassword
              onChangeText={value => setInputs({password: value})}
            />
          </FormField>
          <Text text="Forgot Password?" color={color.textSecondary} weight="semiBold" alignSelf="flex-end" onPress={() => null} />
          <Col mt={3}>
            <Button
              title="Sign In"
              variant="primary"
              onPress={handleSignIn}
              loading={loading}
              disabled={!inputs.username || !inputs.password}
            />
            <Divider text="or" my={3} />
            <Button
              title="Sign In with Google"
              variant="white"
              border
              icon={<Icon name="google-sign-in" type="image" mr={2} />}
              mb={3}
              onPress={handleSignInGoogle}
              loading={loading}
            />
            <Button
              title="Sign In with Facebook"
              icon={<Icon name="facebook-sign-in" type="image" mr={2} />}
              fontWeight="600"
              fontSize={14}
              loading={loading}
            />
          </Col>
        </Col.X>
        <BottomSafeAreaView />
      </Screen>
    </Col.X>
  );
};
