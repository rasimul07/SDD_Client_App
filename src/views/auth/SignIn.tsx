import {FC, useState} from 'react';
import colors from '@utils/colors';
import {StyleSheet, View} from 'react-native';
import React from 'react';

import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form/Form';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList, UserStackParamList} from '@src/@types/navigation';
import { FormikHelpers } from 'formik';
import client from '@src/api/client';
import { updateProfile, updateLoggedInState } from '@src/store/auth';
import { saveToAsyncStorage, Keys } from '@utils/asyncStorage';
import { useDispatch } from 'react-redux';
import { catchAsyncError } from '@src/api/catchError';
import { updateNotification } from '@src/store/notification';

const signInSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('password is missing')
    .min(8, 'minimum 8 character')
    .required('Name is required'),
});

interface PropsType {}
const initialValues = {
  email: '',
  password: '',
};
interface SignInUserInfo {
  email: string;
  password: string;
}
const SignIn: FC<PropsType> = props => {
  const [sequreEntry, setSequreEntry] = useState(true);
  // const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
    const handleSubmit = async (
      values: SignInUserInfo,
      action: FormikHelpers<SignInUserInfo>,
    ) => {
      //  console.log(values);
      action.setSubmitting(true);
      try {
        const {data} = await client.post('/auth/sign-in', {
          ...values,
        });
        // console.log(data);
        // navigation.navigate('Home');
         await saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);
         dispatch(updateProfile(data.profile));
         dispatch(updateLoggedInState(true));
      } catch (error) {
         const errorMessage = catchAsyncError(error);
         dispatch(updateNotification({message: errorMessage, type: 'error'}));
      }
      action.setSubmitting(false);
    };
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signInSchema}>
      <AuthFormContainer
        heading="Welcome Back!!"
        subHeading="Let's get started by Log in your account.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="John@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}></AuthInputField>
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={sequreEntry}
            rightIcon={
              <PasswordVisibilityIcon
                privateIcon={sequreEntry}></PasswordVisibilityIcon>
            }
            onRightIconPress={() => {
              setSequreEntry(!sequreEntry);
            }}></AuthInputField>
          <SubmitBtn title="Sign in"></SubmitBtn>
          <View style={styles.linkContainer}>
            <AppLink
              title="I lost My Password"
              onPress={() => navigation.navigate('LostPassword')}></AppLink>
            <AppLink
              title="Sign up"
              onPress={() => navigation.navigate('SignUp')}></AppLink>
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 35,
    borderRadius: 25,
    color: colors.CONTRAST,
  },
  label: {
    color: colors.CONTRAST,
  },
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default SignIn;
