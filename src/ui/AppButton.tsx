import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import colors from '@utils/colors';
import Loader from './Loader';

interface PropsType{
    title:string;
    onPress?(): void
    busy?:boolean
};

const AppButton: FC<PropsType> = ({title,onPress,busy}) => {
    return (
      <Pressable onPress={onPress} style={styles.container}>
        {!busy ? <Text>{title}</Text> : <Loader></Loader>}
      </Pressable>
    );
}
const styles = StyleSheet.create({
container:{
    width:'100%',
    height:45,
    backgroundColor: colors.SECONDARY,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,
    borderRadius:25
},
})
export default AppButton;