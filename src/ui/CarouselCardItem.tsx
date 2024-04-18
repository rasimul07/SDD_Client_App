import { catchAsyncError } from '@src/api/catchError';
import client from '@src/api/client';
import { updateNotification } from '@src/store/notification';
import { Keys, getFromAsyncStorage } from '@utils/asyncStorage';
import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const SLIDER_HEIGHT = Dimensions.get('window').height;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.7);

interface ItemType {
  item: {
    publicId:string
    url: string;
  };
  index: number;
}
const CarouselCardItem= ({item, index}: ItemType) => {
  const handleDetele = async()=>{
    try{
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const {data} = await client.delete('/photo/deleteImage',{
        headers: {
         Authorization: 'Bearer '+ token,
         'Content-Type': 'application/json'
        },
        data:{
          index:index
        }
      });
    }catch(error){
      console.log(error);
    }
  }
  return (
    <View style={styles.container} key={index}>
      <Image source={{uri: item.url}} style={styles.image} />
      <TouchableOpacity style={styles.resultBtn}>
        <Text style={styles.resultBtnText}>View Results</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.threeDot} onPress={handleDetele}>
        <Icon name="delete" size={25} color={'#fff'}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  threeDot: {
    zIndex: 2,
    position: 'absolute',
    // backgroundColor: '#fff',
    opacity:0.7,
    right: '5%',
    top: '3%',
    borderRadius: 20,
    padding:3
  },
  resultBtn: {
    zIndex: 2,
    position: 'absolute',
    bottom: '20%',
    backgroundColor: '#fff',
    borderRadius: 30,
    left: '23%',
  },
  resultBtnText: {
    fontSize: 18,
    margin: 7,
    paddingHorizontal: 5,
    color: '#000',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
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
    width: ITEM_WIDTH,
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

export default CarouselCardItem;
