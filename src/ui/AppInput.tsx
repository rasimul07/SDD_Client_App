import {FC} from 'react';
import {StyleSheet, Text, TextInput, View, TextInputProps} from 'react-native';
import React from 'react';
import colors from '@utils/colors';

interface PropsType extends TextInputProps {}

const AppInput: FC<PropsType> = props => {
  return (
    <TextInput
      {...props}
      style={[styles.input,props.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}></TextInput>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding:10
  },
});
export default AppInput;
