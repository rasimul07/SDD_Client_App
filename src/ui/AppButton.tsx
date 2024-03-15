import { FC } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '@utils/colors';

interface PropsType{
    title:string;
    onPress?(): void
};

const AppButton: FC<PropsType> = ({title,onPress}) => {
    return( <Pressable onPress={onPress} style={styles.container}>
        <Text>{title}</Text>
    </Pressable>
    )
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