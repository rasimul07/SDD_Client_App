import { FC } from 'react';
import { StyleSheet } from 'react-native';
import React from 'react';

interface PropsType{};
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { UserStackParamList } from '@src/@types/navigation';
import Home from '@views/Home';
import Profile from '@views/Profile';
const Stack = createNativeStackNavigator<UserStackParamList>();
const UserNavigator: FC<PropsType> = (props) => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );}

const styles = StyleSheet.create({
container:{},
})
export default UserNavigator;