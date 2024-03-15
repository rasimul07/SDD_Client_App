import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '@utils/colors';

interface PropsType{
    privateIcon: boolean
};

const PasswordVisibilityIcon: FC<PropsType> = ({privateIcon}) => {
    return privateIcon ? (
      <Icon name="eye" color={colors.SECONDARY} size={16}></Icon>
    ) : (
      <Icon name="eye-with-line" color={colors.SECONDARY} size={16}></Icon>
    );}

const styles = StyleSheet.create({
container:{},
})
export default PasswordVisibilityIcon;