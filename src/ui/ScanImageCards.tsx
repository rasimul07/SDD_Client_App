import client from '@src/api/client';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
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
  // console.log(arrayOfImageAndPrediction);
 
  return (
    <View style={{height: 800}}>
      <ScrollView style={styles.scrollView}>
        {arrayOfImageAndPrediction?.map((item, index) => {
          return <ScanImageCard item={item} key={index} index={index}></ScanImageCard>;
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView:{
    
  },
  cardItemStyle: {
    flex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  delete: {
    zIndex: 2,
    position: 'absolute',
    // backgroundColor: '#fff',
    opacity: 0.9,
    right: '10%',
    top: '6%',
    borderRadius: 20,
    padding: 4,
  },
  resultBtn: {
    zIndex: 3,
    position: 'absolute',
    top: '10%',
    backgroundColor: '#fff',
    borderRadius: 30,
    left: '32%',
    padding: 3,
  },
  resultBtnText: {
    fontSize: 22,
    margin: 7,
    paddingHorizontal: 5,
    color: '#000',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    height: 300,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
export default ScanImageCards;
