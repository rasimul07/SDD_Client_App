import React, {useState} from 'react';

import {View, Text} from 'react-native';
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
        anchor={<Text onPress={showMenu} style={{fontSize:18}}>View All</Text>}
        onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu}>All</MenuItem>
        <MenuItem onPress={hideMenu}>Pending</MenuItem>
        <MenuItem onPress={hideMenu}>Completed</MenuItem>
      </Menu>
    </View>
  );
};

export default MenuContent;
