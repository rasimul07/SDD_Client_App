import { FC } from 'react';
import { StyleSheet } from 'react-native';
import React from 'react';

interface PropsType{};
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { UserStackParamList } from '@src/@types/navigation';
import GetStartedScreen from '@views/GetStartedScreen';
import Home from '@views/Home';
import LostPassword from '@views/auth/LostPassword';
import SignIn from '@views/auth/SignIn';
import SignUp from '@views/auth/SignUp';
import Verification from '@views/auth/Verification';
const Stack = createNativeStackNavigator<UserStackParamList>();
const UserNavigator: FC<PropsType> = (props) => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="GetStart" component={GetStartedScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LostPassword" component={LostPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );}

const styles = StyleSheet.create({
container:{},
})
export default UserNavigator;