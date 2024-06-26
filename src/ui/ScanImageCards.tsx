import client from '@src/api/client';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {catchAsyncError} from '@src/api/catchError';
import {updateNotification} from '@src/store/notification';
import {getDataUpdateState, updateDataState} from '@src/store/dataUpdate';
import {UserStackParamList} from '@src/@types/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ScanImageCard from './ScanImageCard';
import { getAuthState, updateArrayOfImageAndPrediction } from '@src/store/auth';

function ScanImageCards() {

  const {isUpdate} = useSelector(getDataUpdateState);
  const {arrayOfImageAndPrediction,predictionUpdatehappen} = useSelector(getAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    const getImages = async () => {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const {data} = await client.get('/photo/getImages', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(updateArrayOfImageAndPrediction(data.photos));
    };
    getImages();
  }, [isUpdate, predictionUpdatehappen]);
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={styles.scrollView} scrollEnabled overScrollMode='always'>
        {arrayOfImageAndPrediction?.map((item, index) => {
          return <ScanImageCard item={item} key={index} index={index}></ScanImageCard>;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    flexDirection:'column',
  }
});
export default ScanImageCards;
