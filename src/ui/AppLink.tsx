import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '@utils/colors';

interface PropsType{
    title:string;
    onPress?():void;
};

const AppLink: FC<PropsType> = ({title,onPress}) => {
    return (
      <Pressable style={styles.container} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    );}

const styles = StyleSheet.create({
container:{},
title:{
    color:colors.SECONDARY,
}
})
export default AppLink;