import {FC, useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';
import client from '@src/api/client';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@src/@types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type PropsType = NativeStackScreenProps<AuthStackParamList, 'Verification'>;
const otpFields = new Array(6).fill('');

const Verification: FC<PropsType> = ({route}) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const [submitting,setSubmitting] = useState(false)
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const {userInfo} = route.params;
  const handleChange = (value: string, index: number) => {
    // console.log('value-index', value, index);
    const newOtp = [...otp];
    if (value === 'Backspace') {
      //moves to the previous only if the field is empty
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = '';
    } else {
      //update otp and move to the next
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }
    // console.log('new Otp', newOtp);
    setOtp([...newOtp]);
  };
  const handlePaste = (value: string) => {
    // console.log('value', value);
    // console.log('value-length', value.length);
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      // console.log('newOtp', newOtp);
      setOtp(newOtp);
    }
};
// console.log('otp', otp);
const isValidOtp = otp.every(value => {
  return value.trim();
});

const handleSubmit = async () => {
  if (!isValidOtp) return;
  setSubmitting(true);
  try {
    const {data} = await client.post('/auth/verify-email', {
      userId: userInfo.id,
      token: otp.join(''),
    });
    // console.log(data);
    navigation.navigate('SignIn');
  } catch (error) {
    console.log('Error inside Verification', error);
  }
  setSubmitting(false);
};
const requestForOTP = async () => {
  try {
    await client.post('/auth/re-verify-email', {userId: userInfo.id});
  } catch (error) {
    console.log('Requesting for new otp: ', error);
  }
};
useEffect(() => {
  inputRef.current?.focus();
}, [activeOtpIndex]);
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  return (
    <AuthFormContainer heading="Please look at your email">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              key={index}
              placeholder="*"
              ref={activeOtpIndex === index ? inputRef : null}
              onKeyPress={({nativeEvent}) => {
                // console.log(nativeEvent.key)
                handleChange(nativeEvent.key, index);
              }}
              keyboardType="numeric"
              onChangeText={handlePaste}
              value={otp[index]}
            ></OTPField>
          );
        })}
      </View>
      <AppButton title="Submit" onPress={handleSubmit}></AppButton>
      <View style={styles.linkContainer}>
        <AppLink title="Resent OTP"></AppLink>
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'flex-end',
  },
});
export default Verification;
