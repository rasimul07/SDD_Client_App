import {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {getNotificationState, updateNotification} from '@src/store/notification';
import colors from '@utils/colors';

interface PropsType {}

const AppNotification: FC<PropsType> = props => {
  const {message, type} = useSelector(getNotificationState);
  let backgroundColor = colors.ERROR;
  let textColor = colors.CONTRAST;
  const height = useSharedValue(0);
  const dispatch = useDispatch();
  const heightStyle = useAnimatedStyle(()=>{
    return{
        height: height.value
    }
  })
  switch (type) {
    case 'success':
      backgroundColor = colors.SUCCESS;
      textColor = colors.PRIMARY;
      break;
  }

  useEffect(()=>{
    let timeoutId: NodeJS.Timeout
    const performAnimation = ()=>{
      height.value = withTiming(45,{
        duration:150
      })
      timeoutId = setTimeout(()=>{
        height.value = withTiming(0,{
          duration:150
        })
        dispatch(updateNotification({message:'',type}))
      },3000)
    }

    if(message) performAnimation();
    return ()=>{
      clearTimeout(timeoutId)
    }
  },[message])
  return (
    <Animated.View style={[styles.container, {backgroundColor},heightStyle]}>
      <Text style={[styles.message, {color: textColor}]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default AppNotification;
