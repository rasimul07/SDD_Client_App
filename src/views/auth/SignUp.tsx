

/// Refactor Formik
import {FC, useState} from 'react';
import colors from '@utils/colors';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';

import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form/Form';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@src/@types/navigation';
import client from '@src/api/client';

const signupSchema = yup.object({
  name: yup
    .string()
    .trim('name is missing')
    .min(3, 'invalid name!!')
    .required('Name is required'),
  email: yup
    .string()
    .trim('Email is missing')
    .email('invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('password is missing')
    .min(8, 'pasword is too short!!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'password is too simple!!',
    )
    .required('Name is required'),
});

interface PropsType {}
const initialValues = {
  name: '',
  email: '',
  password: '',
};
interface NewUser {
  name: string;
  email: string;
  password: string;
}
const SignUp: FC<PropsType> = props => {
  const [sequreEntry, setSequreEntry] = useState(true);
 const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
const handleSubmit = async (values: NewUser) => {
  try {
    const {data} = await client.post('/auth/create', {
      ...values,
    });
    // console.log(data);
    console.log(data.user);
    navigation.navigate('Verification', {userInfo: data.user});
  } catch (error) {
    console.log('Sign up error: ', error);
  }
};
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signupSchema}>
      <AuthFormContainer
        heading="Welcome"
        subHeading="Let's get started by creating your account.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="John Doe"
            label="Name"
            containerStyle={styles.marginBottom}></AuthInputField>
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
          <SubmitBtn title="Signup"></SubmitBtn>
          <View style={styles.linkContainer}>
            <AppLink
              title="I lost My Password"
              onPress={() => navigation.navigate('LostPassword')}></AppLink>
            <AppLink
              title="Sign in"
              onPress={() => navigation.navigate('SignIn')}></AppLink>
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
export default SignUp;
