import React, {useState} from 'react';
import styled from 'styled-components';
import {ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {BottomSafeAreaView, Button, Col, Icon, Row, Screen, Text, Wallpaper} from '~/components/elements';
import {color} from '~/theme';
import {AppDispatch} from '~/redux/root-store';
import {updateCurrentUser} from '~/redux/users/thunk';
import {RootState} from '~/redux/root-reducer';

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
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 13.5,
    fontWeight: '400',
    paddingTop: 13,
  },
  firstText: {
    fontSize: 13.5,
    fontWeight: '400',
  },
  link: {
    fontSize: 13.5,
    fontWeight: '600',
  },
});

const CheckBox = styled(Button).attrs({
  type: 'clear',
  variant: 'white',
})`
  margin-right: 2px;
  height: 40px;
`;

const StyledRow = styled(Row.L).attrs({px: 'screen', my: 3})``;

export const ConsentScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {navigate} = useNavigation();
  const {id: userId} = useSelector((state: RootState) => state.auth.currentUser) || {};

  const [checked, setChecked] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const nextScreen = async () => {
    await dispatch(updateCurrentUser({data: {isConsentAccepted: true}, id: userId!}));
    // navigate(STACK_QUESTIONNAIRE);
  };
  const renderCheckBoxIcon = () => (
    <Icon
      name={checked ? 'checkbox-filled' : 'checkbox-empty'}
      type="image"
      width={24}
      height={24}
      onPress={() => setChecked(!checked)}
    />
  );

  const renderRectangle = () =>
    !privacyOpen && !termsOpen ? (
      <SmallRectangle>
        <ScrollView>
          <Col>
            <Text text="Welcome to Ease" variant="subtitle" weight="bold" alignSelf="center" mt={7} mb={3} />
            <StyledRow>
              <CheckBox icon={renderCheckBoxIcon()} />
              <Row>
                <Text text="I agree to the" color={color.textSecondary} style={styles.firstText} />
                <Text
                  text=" Privacy Policy"
                  color={color.textSecondary}
                  style={styles.link}
                  onPress={() => setPrivacyOpen(true)}
                />
                <Text text=" and" color={color.textSecondary} style={styles.firstText} />
                <Text text=" Terms of Use." color={color.textSecondary} style={styles.link} onPress={() => setTermsOpen(true)} />
              </Row>
            </StyledRow>
            <StyledRow>
              <CheckBox icon={renderCheckBoxIcon()} />
              <Text
                text="I agree to the processing of my personal data to send me notifications and updates."
                color={color.textSecondary}
                style={styles.text}
              />
            </StyledRow>
            <StyledRow>
              <CheckBox icon={renderCheckBoxIcon()} />
              <Text
                text="I agree to the processing of my personal data to provide me app features and healthcare services."
                color={color.textSecondary}
                style={styles.text}
              />
            </StyledRow>
          </Col>
        </ScrollView>
        <BottomSafeAreaView>
          <Button title="Continue" variant="primary" mx="screen" mt={4} onPress={nextScreen} />
        </BottomSafeAreaView>
      </SmallRectangle>
    ) : (
      <LargeRectangle>
        <ScrollView>
          <Row mt={6} mb={2} ml={8}>
            <Text text={privacyOpen ? 'Privacy Policy' : 'Terms of Use'} variant="heading" ml={8} mr={5} />
            <Icon
              ml={8}
              name="cross"
              type="image"
              width={24}
              height={24}
              onPress={() => {
                setPrivacyOpen(false);
                setTermsOpen(false);
              }}
            />
          </Row>
          <Col.C>
            <Paragraph text="Ease Healthcare Privacy Policy" variant="subheading" />
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
      <Wallpaper name="consent" />
      <Screen backgroundColor={color.transparent} px={0}>
        <Col.X>{renderRectangle()}</Col.X>
      </Screen>
    </Col.X>
  );
};
