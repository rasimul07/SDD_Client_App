/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StyleSheet} from 'react-native';
// import AuthNavigator from '@src/navigation/AuthNavigator';
import UserNavigator from './navigation/UserNavigator';
import Verification from '@views/auth/Verification';
import AppContainer from '@components/AppContainer';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './store';
import Profile from '@views/Profile';
import Result from '@views/Result';
import ScanImageCards from '@ui/ScanImageCards';
import {PersistGate} from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <AppContainer>
          <AppNavigator></AppNavigator>
        </AppContainer>
      </PersistGate>
    </Provider>
    // <Profile></Profile>
    // <Result></Result>
  );
}

const styles = StyleSheet.create({});

export default App;
