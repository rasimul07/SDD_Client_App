import { NavigationProp, useNavigation, useNavigationState } from '@react-navigation/native';
import { UserStackParamList } from '@src/@types/navigation';
import { catchAsyncError } from '@src/api/catchError';
import client from '@src/api/client';
import { updateDataState } from '@src/store/dataUpdate';
import { updateNotification } from '@src/store/notification';
import { getFromAsyncStorage, Keys } from '@utils/asyncStorage';
import colors from '@utils/colors';
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';

interface MenuContentProps {
  visible: boolean;
  showMenu: () => void;
  hideMenu: () => void;
  index:number;
}
const VerticalDotMenu = ({visible, showMenu, hideMenu,index}: MenuContentProps) => {
    const dispatch = useDispatch();
     const navigation = useNavigation<NavigationProp<UserStackParamList>>();
    const handleDetele = async (index: number) => {
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        const {data} = await client.delete('/photo/deleteImage', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          data: {
            index: index,
          },
        });
        dispatch(updateNotification({message: data.message, type: 'success'}));
        dispatch(updateDataState(true));
      } catch (error) {
        const errorMessage = catchAsyncError(error);
        dispatch(updateNotification({message: errorMessage, type: 'error'}));
      }
      dispatch(updateDataState(false));
    };
    
  const handleResult = (index: number) => {
    navigation.navigate('Result', {index});
  };
  return (
    <View>
      <Menu
        visible={visible}
        anchor={
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            onPress={showMenu}></MaterialCommunityIcons>
        }
        onRequestClose={hideMenu}>
        <MenuItem
          onPress={() => {
            hideMenu;
            handleResult(index);
          }}
          textStyle={styles.textColor}>
          Show Details
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu;
          }}
          textStyle={styles.textColor}>
          Retake
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu();
            handleDetele(index);
          }}
          textStyle={styles.textColor}>
          Remove
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

export default VerticalDotMenu;
