import React from 'react';
import {View, Text} from 'react-native';
import {LinearProgress} from '@rneui/themed';
import colors from '@utils/colors';
const LinearProgressAPI: React.FunctionComponent= () => {
  return (
    <View>
      <View
        style={{
          margin: 10,
        }}>
        <Text>uploading</Text>
        <LinearProgress style={{marginVertical: 10}} color={colors.PRIMARY}/>
      </View>
    </View>
  );
};

export default LinearProgressAPI;
