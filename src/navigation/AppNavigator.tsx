import {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import client from '@src/api/client';
import {
  getAuthState,
  updateBusyState,
  updateProfile,
  updateLoggedInState,
} from '@src/store/auth';
import {useSelector, useDispatch} from 'react-redux';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {NavigationContainer} from '@react-navigation/native';
import UserNavigator from './UserNavigator';
import AuthNavigator from './AuthNavigator';
import Loader from '@ui/Loader';
import colors from '@utils/colors';
import { catchAsyncError } from '@src/api/catchError';
import { updateNotification } from '@src/store/notification';

interface PropsType {}

const AppNavigator: FC<PropsType> = props => {
  const {loggedIn, busy} = useSelector(getAuthState);
  // console.log(loggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        // console.log(token);
        if (!token) return dispatch(updateBusyState(false));
        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        console.log(data.profile)
        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
        // console.log('My auth Profile:',data);
      } catch (error) {
        // console.log('Auth error :', err);
        const errorMessage = catchAsyncError(error);
        dispatch(updateNotification({message: errorMessage, type: 'error'}));
      }
      dispatch(updateBusyState(false));
    };
    fetchAuthInfo();
  }, [dispatch,loggedIn]);
  return (
    <NavigationContainer>
      {loggedIn ? (
        <UserNavigator></UserNavigator>
      ) : (
        <AuthNavigator></AuthNavigator>
      )}

      {busy ? (
        <View
          style={{
            // position: 'absolute',
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,
            ...StyleSheet.absoluteFillObject, //that works same as above comments
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Loader color="white" />
        </View>
      ) : null}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default AppNavigator;
