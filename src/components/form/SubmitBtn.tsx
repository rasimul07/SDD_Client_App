import {FC} from 'react';
import { StyleSheet, View} from 'react-native';
import React from 'react';
import {useFormikContext} from 'formik';
import AppButton from '@ui/AppButton';

interface PropsType {
  title: string;
}

const SubmitBtn: FC<PropsType> = ({title}) => {
  const {handleSubmit,isSubmitting} = useFormikContext();
  return (
    <AppButton
      busy={isSubmitting}
      onPress={handleSubmit}
      title={title}></AppButton>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default SubmitBtn;
