import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

interface MenuContentProps {
  visible:boolean
  showMenu: () => void;
  hideMenu: () => void;
}
const MenuContent= ({
  visible,
  showMenu,
  hideMenu,
}:MenuContentProps) => {
  
  return (
    <View>
      <Menu
        visible={visible}
        anchor={
          <Text onPress={showMenu} style={{fontSize: 18}}>
            View All
          </Text>
        }
        onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu} textStyle={styles.textColor}>
          All
        </MenuItem>
        <MenuItem onPress={hideMenu} textStyle={styles.textColor}>
          Pending
        </MenuItem>
        <MenuItem onPress={hideMenu} textStyle={styles.textColor}>
          Completed
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textColor: {
    color: '#000',
  },
});

export default MenuContent;
