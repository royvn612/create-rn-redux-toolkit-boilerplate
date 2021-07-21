import React from 'react';
import styled from 'styled-components';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {BottomSafeAreaView, Button, Col, FieldInput, Screen, Text, Wallpaper} from '~/components/elements';
import {color} from '~/theme';
import {AppDispatch} from '~/redux/root-store';
import {useInput, useNotification, useRequestState} from '~/hooks';
import {register, RegisterParams} from '~/redux/auth/thunk';
import {requestOK} from '~/utils/thunk-api';

const FormField = styled(Col)``;
const FieldLabel = styled(Text).attrs({weight: 'bold', mb: 3})``;

export const SignUpScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {addValidationMessage} = useNotification(dispatch);
  const {navigate} = useNavigation();
  const {loading} = useRequestState(register);

  const rules = {
    email: {email: true},
    password: {presence: true},
    name: {presence: true},
  };
  const {inputs, setInputs, validation} = useInput({} as RegisterParams['data'], {rules});

  const onSignUpSuccess = () => {
    Alert.alert('Sign up success');
    // navigate(SCREEN_CONSENT);
  };

  const handleSignUp = async () => {
    const errors = validation.getErrors();
    if (errors) {
      addValidationMessage(errors);
      return;
    }
    const resAction = await dispatch(register({data: inputs}));
    if (requestOK(resAction, register)) {
      onSignUpSuccess();
    }
  };

  return (
    <Col.X>
      <Wallpaper />
      <Screen px="screen" preset="scroll" unsafe>
        <Col.X>
          <Text text="Sign Up" variant="heading" mt={7} mb={3} />
          <Text text="Create an account to get started" color={color.textSecondary} mb={6} />
          <FormField>
            <FieldLabel text="Full Name" />
            <FieldInput placeholder="Enter your first name" onChangeText={value => setInputs({name: value})} />
          </FormField>
          <FormField>
            <FieldLabel text="Preferred Name" />
            <FieldInput placeholder="Enter your last name" onChangeText={value => setInputs({preferredName: value})} />
          </FormField>
          <FormField>
            <FieldLabel text="Email Address" />
            <FieldInput
              autoCapitalize="none"
              placeholder="Enter email address"
              onChangeText={value => setInputs({email: value})}
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
          <Col mt={3}>
            <Button title="Sign Up" variant="primary" onPress={handleSignUp} loading={loading} />
          </Col>
        </Col.X>
        <BottomSafeAreaView />
      </Screen>
    </Col.X>
  );
};
