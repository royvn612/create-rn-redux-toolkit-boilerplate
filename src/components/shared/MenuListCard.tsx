import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Card, Icon, ListItem, Row, Text} from '~/components/elements';
import {color} from '~/theme';

export interface MenuItem {
  name?: string;
  avatar_url?: string;
  nextScreen?: string;
  value?: string;
  iconName?: string | null;
}

interface Props {
  menuList: MenuItem[];
  onPress?: (menu: MenuItem) => any;
}

const styles = StyleSheet.create({});

export const MenuListCard = memo(({menuList, onPress}: Props) => {
  const handleOnPress = (menuItem: MenuItem) => {
    if (onPress) {
      onPress(menuItem);
    }
  };

  return (
    <Card py={0} mb={5}>
      {menuList.map(l => (
        <TouchableWithoutFeedback onPress={() => handleOnPress(l)} key={`menu-list-${l.name}`}>
          <ListItem bottomDivider>
            {l.iconName !== null && <Icon size={22} type="image" name={l.iconName || 'checkbox-filled'} />}
            <ListItem.Content>
              <Text text={l.name} weight="semiBold" />
            </ListItem.Content>
            <Row.C>
              {!!l.value && <Text text={l.value} variant="small" color={color.textSecondary} />}
              {!!l.nextScreen && <Icon name="right" type="antdesign" size={20} ml={0} pl={0} mr={0} pr={0} />}
            </Row.C>
          </ListItem>
        </TouchableWithoutFeedback>
      ))}
    </Card>
  );
});
