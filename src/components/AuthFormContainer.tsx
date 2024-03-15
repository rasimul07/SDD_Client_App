import {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '@utils/colors';
import CircleUI from '@ui/CircleUI';

interface PropsType {
  heading?: string;
  subHeading?: string;
  children: ReactNode;
}

const AuthFormContainer: FC<PropsType> = ({heading, subHeading, children}) => {
  return (
    <View style={styles.container}>
      <CircleUI postion="top-left" size={200} />
      <CircleUI postion="top-right" size={200} />
      <CircleUI postion="bottom-left" size={200} />
      <CircleUI postion="bottom-right" size={200} />
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/skin-disease.png')}
            style={styles.logoImage}></Image>
          <Image source={require('../assets/logo.png')} style={{marginLeft:-10}}></Image>
        </View>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeading: {
    color: colors.CONTRAST,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  logoImage: {
    height: 52,
    width: 52,
  },
  logoContainer:{
    flexDirection:'row',
  }
});
export default AuthFormContainer;
