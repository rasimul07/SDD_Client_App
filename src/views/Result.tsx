import {FC, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import {UserStackParamList} from '@src/@types/navigation';
import client from '@src/api/client';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import colors from '@utils/colors';
import {useSelector} from 'react-redux';
import {getAuthState} from '@src/store/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
type CartItemsScreenRouteProp = RouteProp<UserStackParamList, 'Result'>;

type PropsType = {
  route: CartItemsScreenRouteProp;
};

const Result: FC<PropsType> = ({route}) => {
  // const [predictedClass, setPredictedClass] = useState(null);
  const {arrayOfImageAndPrediction} = useSelector(getAuthState);
  const {index} = route.params;
  const navigation = useNavigation<NavigationProp<UserStackParamList>>();
  // useEffect(() => {
  //   const handleGetPrediction = async (index: number) => {
  //     try {
  //       const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  //       const {data} = await client.post(
  //         '/photo/getPrediction',
  //         {index: index},
  //         {
  //           headers: {
  //             Authorization: 'Bearer ' + token,
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );
  //       setPredictedClass(data.predicted_class);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   handleGetPrediction(index);
  // }, []);
  // console.log(arrayOfImageAndPrediction);
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="arrow-left-thin"
        size={40}
        color={'#fff'}
        style={styles.iconStyle} onPress={()=>{navigation.navigate('Home')}}></MaterialCommunityIcons>
      <Image
        source={{uri: arrayOfImageAndPrediction?.at(index)?.url}}
        containerStyle={styles.item}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={styles.Heading}>Possible Result</Text>
      <Text style={styles.predictionText}>
        {!arrayOfImageAndPrediction?.at(index)?.prediction
          ? 'Processing'
          : arrayOfImageAndPrediction?.at(index)?.prediction}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHTVIOLET,
    flex: 1,
  },
  iconStyle: {
    position: 'absolute',
    top: 10,
    left: 8,
    zIndex: 1,
  },
  item: {
    width: '100%',
    height: '40%',
  },
  Heading: {
    fontSize: 25,
    color: colors.OVERLAY,
    textAlign: 'center',
    marginTop:10,
    fontWeight: 'bold',
  },
  predictionText:{
    textAlign:'center',
    fontSize:20,
    color: colors.PRIMARY
  }
});
export default Result;
