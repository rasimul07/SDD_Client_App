import { ReactNode } from 'react';
import { StyleSheet,  } from 'react-native';
import React from 'react';
import { Formik, FormikHelpers } from 'formik';

interface PropsType<T> {
  initialValues: any;
  validationSchema: any;
  onSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void;
  children: ReactNode;
};

const Form = <T extends object>(props: PropsType<T>) => {
    return (
      <Formik
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        validationSchema={props.validationSchema}
        >{props.children}</Formik>
    );
}

const styles = StyleSheet.create({
container:{},
})
export default Form;