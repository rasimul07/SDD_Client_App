// import React, { useEffect, useState } from 'react';
// import {View} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH,ITEM_HEIGHT} from './CarouselCardItem';
// import client from '@src/api/client';
// import { Keys, getFromAsyncStorage } from '@utils/asyncStorage';
// import { useDispatch } from 'react-redux';

// const CarouselCards = () => {
//   const isCarousel = React.useRef(null);
//   const [data,setData] = useState([])
//   const dispatch = useDispatch();
//   useEffect(()=>{
//     const getImages = async()=>{
//       const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
//       const {data} = await client.get('/photo/getImages',{
//         headers:{
//           Authorization:'Bearer '+token
//         }
//       });
//       setData(data.photos);
//       console.log(data);
//     }
//     getImages();
//   },[])
//   return (
//     <View >
//       <Carousel
//         layout="default"
//         layoutCardOffset={9}
//         ref={isCarousel}
//         data={data}
//         renderItem={CarouselCardItem}
//         sliderWidth={SLIDER_WIDTH}
//         itemWidth={ITEM_WIDTH}
//         itemHeight={ITEM_HEIGHT}
//         inactiveSlideShift={0}
//         useScrollView={true}
//       />
//     </View>
//   );
// };

// export default CarouselCards;

import client from '@src/api/client';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { catchAsyncError } from '@src/api/catchError';
import { updateNotification } from '@src/store/notification';
import { getDataUpdateState, updateDataState } from '@src/store/dataUpdate';
interface ItemType {
  item: {
    publicId: string;
    url: string;
  };
  index: number;
}
function CarouselCards() {
  const width = Dimensions.get('window').width;
  const [data, setData] = useState([]);
  const {isUpdate} = useSelector(getDataUpdateState);
  const dispatch = useDispatch();
  useEffect(() => {
    const getImages = async () => {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const {data} = await client.get('/photo/getImages', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setData(data.photos);
      console.log(data);
    };
    getImages();
  }, [isUpdate]);

    const handleDetele = async (index:number) => {
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        const {data} = await client.delete('/photo/deleteImage', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          data: {
            index: index,
          },
        });
        dispatch(updateNotification({message: data.message, type: 'success'}));
        dispatch(updateDataState(true));
      } catch (error) {
        // console.log(error);
        const errorMessage = catchAsyncError(error);
        dispatch(updateNotification({message: errorMessage, type: 'error'}));
      }
      dispatch(updateDataState(false));
    };
  return (
    <View style={{flex: 1}}>
      <Carousel
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1.1,
          parallaxScrollingOffset: 30,
        }}
        loop={false}
        width={width}
        height={width / 1}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index, item}: ItemType) => (
          <View>
            <Image
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
              source={{uri: item.url}}></Image>
            <TouchableOpacity style={styles.resultBtn}>
              <Text style={styles.resultBtnText}>View Results</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => handleDetele(index)}>
              <Icon name="delete" size={25} color={'#fff'}></Icon>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  delete: {
    zIndex: 2,
    position: 'absolute',
    // backgroundColor: '#fff',
    opacity: 0.9,
    right: '15%',
    top: '6%',
    borderRadius: 20,
    padding: 3,
  },
  resultBtn: {
    zIndex: 2,
    position: 'absolute',
    bottom: '12%',
    backgroundColor: '#fff',
    borderRadius: 30,
    left: '35%',
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
export default CarouselCards;
