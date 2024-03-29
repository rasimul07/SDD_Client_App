import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '@utils/colors';

interface PropsType{
    title:string;
    onPress?():void;
    active?:boolean;
};

const AppLink: FC<PropsType> = ({title,active=true,onPress}) => {
    return (
      <Pressable
        style={{opacity: active ? 1 : 0.4}}
        onPress={active ? onPress : null}>
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