import { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '@utils/colors';
import { Keys, clearAsyncStorage } from '@utils/asyncStorage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList, UserStackParamList } from '@src/@types/navigation';
import { useDispatch } from 'react-redux';
import { updateLoggedInState } from '@src/store/auth';

interface PropsType{};

const Profile: FC<PropsType> = (props) => {
    // const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        clearAsyncStorage(Keys.AUTH_TOKEN);
        dispatch(updateLoggedInState(false))
    }
    return (
        <View style={styles.container}>
            <Text>Welcome to Profile</Text>
            <Button title='Logout' onPress={handleLogout}></Button>
        </View>
)}

const styles = StyleSheet.create({
  container: {},
  logOutBtn:{
    backgroundColor:colors.SECONDARY
  }
});
export default Profile;