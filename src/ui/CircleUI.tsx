import {FC} from 'react';
import {FlexStyle, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '@utils/colors';

interface PropsType {
  size: number;
  postion: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CircleUI: FC<PropsType> = ({size, postion}) => {
  let viewPosition: FlexStyle = {};
  switch (postion) {
    case 'top-left':
      viewPosition = {top: -size / 2, left: -size / 2};
    break;
    case 'top-right':
      viewPosition = {top: -size / 2, right: -size / 2};
    break;
    case 'bottom-right':
      viewPosition = {bottom: -size / 2, right: -size / 2};
    break;
    case 'bottom-left':
      viewPosition = {bottom: -size / 2, left: -size / 2};
    break;
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        position: 'absolute',
        ...viewPosition,
      }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.INACTIVE_CONTRAST
        }}
      />

      <View
        style={{
          width: size / 1.5,
          height: size / 1.5,
          borderRadius: size / 2,
          backgroundColor: colors.INACTIVE_CONTRAST,
          opacity: 0.3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{translateX: -size / 3}, {translateY: -size / 3}],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default CircleUI;
