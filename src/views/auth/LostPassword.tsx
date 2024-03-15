import {FC, useState} from 'react';
import colors from '@utils/colors';
import {StyleSheet, View} from 'react-native';
import React from 'react';

import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form/Form';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@src/@types/navigation';

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('invalid email')
    .required('Email is required'),
});

interface PropsType {}
const initialValues = {
  email: '',
};
const LostPassword: FC<PropsType> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <Form
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values);
      }}
      validationSchema={lostPasswordSchema}>
      <AuthFormContainer
        heading="Forget Password!"
        subHeading="Oops, did you forget your password? Don't worry, we'll help you get back in.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="John@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}></AuthInputField>
          <SubmitBtn title="Send link"></SubmitBtn>
          <View style={styles.linkContainer}>
            <AppLink
              title="Sign in"
              onPress={() => navigation.navigate('SignIn')}></AppLink>
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
export default LostPassword;
