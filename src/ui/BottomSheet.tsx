import React, {useState} from 'react';
import {BottomSheet, Button, ListItem} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { TouchableOpacity,Text } from 'react-native';
// import { yellowColor,blueColor } from '../assets/color';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import colors from '@utils/colors';
import client from '@src/api/client';
// import {handleUpload} from '../utils/cloudinary';
// import { data } from './CarouselCards';


type BottomSheetComponentProps = {
    isVisible1:boolean;
    setIsVisible1:(bool:boolean)=>void
};

const BottomSheetComponent: React.FunctionComponent<
  BottomSheetComponentProps
> = (props) => {
const [images, setImages] = useState<string[]>([]);

const callSingleImageUsingGallery = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then( async image => {
    console.log(image);
    console.log(image.path);
    
    try {
      const {data} = await client.post(
        '/photo/imageUpload',

        {
  "Content-Type": "multipart/form-data"
}
        // {
        //   email: 'rasimul29928@gmail.com',
        //   password: 'Rasimul12345%',
        // },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
};
const callSingleImageUsingCamera = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(async image => {
    // const temp = [...images];
    console.log(image.path);
    try{
      const response = await fetch('http://localhost:5789/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'rasimul29928@gmail.com',
          password: 'Rasimul12345%',
        }),
      });
      console.log(response);
    }catch(error){
      console.log(error)
    }

  });
};


  return (
    <SafeAreaProvider>
      <BottomSheet modalProps={{}} isVisible={props.isVisible1}>
        <TouchableOpacity
          style={styles.button}
          onPress={callSingleImageUsingCamera}>
          <Text style={styles.textSize}>Using Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={callSingleImageUsingGallery}>
          <Text style={styles.textSize}>Browse Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.PRIMARY }]}
          onPress={() => props.setIsVisible1(false)}>
          <Text style={styles.textSize}>Cancel</Text>
        </TouchableOpacity>
      </BottomSheet>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor:'white'
  },
  textSize:{
    fontSize:20,
    textAlign:'center',
    padding:10,
    color:'black'
  }
});

export default BottomSheetComponent;
