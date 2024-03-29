import { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '@utils/colors';

interface PropsType{
    color?:string
};
const Loader: FC<PropsType> = ({color=colors.CONTRAST}) => {
    const initialRotation = useSharedValue(0);
    const transform = useAnimatedStyle(()=>{
        return{
            transform:[{rotate:`${initialRotation.value}deg`}]
        }
    })
    useEffect(()=>{
        initialRotation.value = withRepeat(withTiming(360),-1)     //-1 represents infinite repeat
    })
    return (
        <Animated.View style={transform}>
            <AntDesign name='loading1' size={24} color={color}></AntDesign>
        </Animated.View>
)}

const styles = StyleSheet.create({
container:{},
})
export default Loader;