/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  StyleSheet,
} from 'react-native';
// import AuthNavigator from '@src/navigation/AuthNavigator';
import UserNavigator from './navigation/UserNavigator';
function App(): React.JSX.Element {
  return (
      <NavigationContainer>
        <UserNavigator></UserNavigator>
      </NavigationContainer>
      // <Profile></Profile>
  );
}

const styles = StyleSheet.create({});

export default App;
