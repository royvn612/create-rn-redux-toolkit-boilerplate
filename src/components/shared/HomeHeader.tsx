import React, {memo} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Avatar, Col, Icon, Row, Text} from '~/components/elements';
import {color} from '~/theme';
import {STACK_SETTINGS} from '~/navigators/route-names';
import {RootState} from '~/redux/root-reducer';
import {getGreetingMessage, getUserDisplayName} from '~/utils/helpers';

const styles = StyleSheet.create({
  iconContainerStyle: {
    shadowColor: '#000000',
    shadowOffset: {height: 4, width: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export const HomeHeader = memo(() => {
  const {navigate} = useNavigation();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)!;

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{backgroundColor: color.palette.white}}>
      <Row.C mx="screen">
        <Col.X>
          <Text text={`Hi ${getUserDisplayName(currentUser)}`} variant="subheading" mb={1} />
          <Text text={getGreetingMessage()} variant="title" color={color.textLighter} />
        </Col.X>
        <Col style={Platform.OS === 'ios' ? styles.iconContainerStyle : undefined}>
          <Icon
            name="trophy"
            type="ionicon"
            size={18}
            reverse
            reverseColor={color.primaryBackground}
            color={color.palette.white}
            containerStyle={styles.iconContainerStyle}
            mr={5}
          />
        </Col>
        <Avatar
          rounded
          uri="https://source.unsplash.com/collection/3816160/300x300"
          size={50}
          onPress={() => navigate(STACK_SETTINGS)}
        />
      </Row.C>
    </SafeAreaView>
  );
});
