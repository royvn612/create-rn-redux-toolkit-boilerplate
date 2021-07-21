import React, {useState} from 'react';
import styled from 'styled-components';
import {ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {BottomSafeAreaView, Button, Col, Icon, Row, Screen, Text, Wallpaper, CheckBox} from '~/components/elements';
import {color} from '~/theme';
import {AppDispatch} from '~/redux/root-store';
import {updateCurrentUser} from '~/redux/users/thunk';
import {RootState} from '~/redux/root-reducer';
import {useBoolBag, useInput} from '~/hooks';
import {setCurrentUser} from '~/redux/auth/slice';

const Paragraph = styled(Text)`
  margin-top: 20px;
  width: 346px;
  line-height: 22px;
  font-size: 14px;
`;

const SmallRectangle = styled(Col.X)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 30px;
  background-color: ${color.palette.white};
  height: 55%;
`;

const LargeRectangle = styled(SmallRectangle)`
  height: 90%;
`;

const styles = StyleSheet.create({
  closeIcon: {right: 20, position: 'absolute'},
});

const CheckboxTitle = styled(Text).attrs({ml: 2, color: color.textSecondary})``;

export const ConsentScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser) || {};
  const {boolBag, toggleBoolBag} = useBoolBag({isCheckPrivacy: false, isCheckSendNotif: false, isCheckService: false});

  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const nextScreen = async () => {
    // await dispatch(updateCurrentUser({data: {isConsentAccepted: true}, id: userId!}));

    // For fake user, please remove it later on
    await dispatch(setCurrentUser({user: {...currentUser, isConsentAccepted: true}}));
  };

  const PrivacyText = (
    <CheckboxTitle>
      I agree to the
      <Text color={color.textSecondary} text=" Privacy Policy" weight="semiBold" onPress={() => setPrivacyOpen(true)} />
      &nbsp;and
      <Text color={color.textSecondary} text=" Terms of Use." weight="semiBold" onPress={() => setTermsOpen(true)} />
    </CheckboxTitle>
  );

  const renderRectangle = () =>
    !privacyOpen && !termsOpen ? (
      <SmallRectangle>
        <ScrollView>
          <Col>
            <Text text="Welcome" variant="subtitle" weight="bold" alignSelf="center" mt={5} mb={5} />
            <CheckBox title={PrivacyText} checked={boolBag.isCheckPrivacy} onPress={() => toggleBoolBag('isCheckPrivacy')} />
            <CheckBox
              title={<CheckboxTitle text="I agree to the processing of my personal data to send me notifications and updates." />}
              checked={boolBag.isCheckSendNotif}
              onPress={() => toggleBoolBag('isCheckSendNotif')}
            />
            <CheckBox
              title={
                <CheckboxTitle text="I agree to the processing of my personal data to provide me app features and services." />
              }
              checked={boolBag.isCheckService}
              onPress={() => toggleBoolBag('isCheckService')}
            />
          </Col>
        </ScrollView>
        <BottomSafeAreaView>
          <Button
            title="Continue"
            variant="primary"
            mx="screen"
            mt={4}
            onPress={nextScreen}
            disabled={!Object.values(boolBag).every(i => i)}
          />
        </BottomSafeAreaView>
      </SmallRectangle>
    ) : (
      <LargeRectangle>
        <ScrollView>
          <Row.C mt={6} mb={2}>
            <Text text={privacyOpen ? 'Privacy Policy' : 'Terms of Use'} variant="heading" />
            <Icon
              containerStyle={styles.closeIcon}
              name="close"
              type="antdesign"
              onPress={() => {
                setPrivacyOpen(false);
                setTermsOpen(false);
              }}
            />
          </Row.C>
          <Col.C>
            <Paragraph text="Privacy Policy" variant="subheading" />
            <Paragraph
              color={color.textSecondary}
              text="Placeholder text. At Website Name, accessible at Website.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Website Name and how we use it."
            />
            <Paragraph
              color={color.textSecondary}
              text="If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at Email@Website.com. This privacy policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Website Name. This policy is not applicable to any information collected offline or via channels other than this website."
            />
            <Paragraph text="Information we collect" variant="subheading" />
            <Paragraph
              color={color.textSecondary}
              text="The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information."
            />
            <Paragraph
              color={color.textSecondary}
              text="If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide."
            />
          </Col.C>
        </ScrollView>
        <BottomSafeAreaView />
      </LargeRectangle>
    );

  return (
    <Col.X>
      <Wallpaper name="bg" />
      <Screen backgroundColor={color.transparent} px={0}>
        <Col.X>{renderRectangle()}</Col.X>
      </Screen>
    </Col.X>
  );
};
