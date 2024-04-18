import {FC, ReactNode} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import AppNotification from './AppNotification';

interface PropsType {
  children: ReactNode;
}

const AppContainer: FC<PropsType> = ({children}) => {
  return <SafeAreaView style={styles.container}>
    <AppNotification/>
    {children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AppContainer;
