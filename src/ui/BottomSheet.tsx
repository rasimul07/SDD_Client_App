import React, {useState} from 'react';
import {BottomSheet, Button, ListItem} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TouchableOpacity, Text} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import axios from 'axios';
import colors from '@utils/colors';
import client from '@src/api/client';
import * as yup from 'yup';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {catchAsyncError} from '@src/api/catchError';
import {updateNotification} from '@src/store/notification';
import {useDispatch, useSelector} from 'react-redux';
import { getDataUpdateState, updateDataState } from '@src/store/dataUpdate';
// import {handleUpload} from '../utils/cloudinary';
// import { data } from './CarouselCards';

type BottomSheetComponentProps = {
  isVisible1: boolean;
  setIsVisible1: (bool: boolean) => void;
};

interface FormFields {
  file?: ImageOrVideo;
}

const defaultForm: FormFields = {
  file: undefined,
};
//{"cropRect": {"height": 1280, "width": 960, "x": 0, "y": 0}, "height": 400, "mime": "image/jpeg", "modificationDate": "1711821684000", "path": "file:///storage/emulated/0/Android/data/com.sdd_client_app/files/Pictures/6220b6d6-2b65-4b7f-b3bc-fa29097eded5.jpg", "size": 58439, "width": 300}
const fileInfoSchema = yup.object().shape({
  file: yup.object().shape({
    path: yup.string().required('file is missing!'),
  }),
});
const BottomSheetComponent: React.FunctionComponent<
  BottomSheetComponentProps
> = props => {
  const [images, setImages] = useState<string[]>([]);
  const [imageInfo, setImageInfo] = useState({...defaultForm});
  const dispatch = useDispatch();

  const callSingleImageUsingGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        dispatch(updateDataState(true))
        try {
          const finalData = await fileInfoSchema.validate({
            file: {path: image.path},
          });
          console.log(finalData);
          const formData = new FormData();
          formData.append('file', {
            uri: finalData.file.path,
            type: 'image/jpeg',
            name: 'test.jpg',
          });

          const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
          console.log(token);
          const {data} = await client.post('/photo/imageUpload', formData, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'multipart/form-data;',
            },
          });
          // console.log(data);
          //  {"image": {"publicId": "ia5efa7bkcjilyukeccf", "url": "https://res.cloudinary.com/dm26zzeuq/image/upload/v1711874177/ia5efa7bkcjilyukeccf.jpg"}}
        } catch (error) {
          const errorMessage = catchAsyncError(error);
          dispatch(updateNotification({message: errorMessage, type: 'error'}));
        }
        dispatch(updateDataState(false));
      })
  };
  const callSingleImageUsingCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      try {
        dispatch(updateDataState(true));
        const finalData = await fileInfoSchema.validate({
          file: {path: image.path},
        });
        console.log(finalData);
        const formData = new FormData();
        formData.append('file', {
          uri: finalData.file.path,
          type: 'image/jpeg',
          name: 'test.jpg',
        });
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        const {data} = await client.post('/photo/imageUpload', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data;',
          },
        });
        console.log(data);
        //  {"image": {"publicId": "ia5efa7bkcjilyukeccf", "url": "https://res.cloudinary.com/dm26zzeuq/image/upload/v1711874177/ia5efa7bkcjilyukeccf.jpg"}}
      } catch (error) {
        const errorMessage = catchAsyncError(error);
        dispatch(updateNotification({message: errorMessage, type: 'error'}));
      }
      dispatch(updateDataState(false));
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
          style={[styles.button, {backgroundColor: colors.PRIMARY}]}
          onPress={() => props.setIsVisible1(false)}>
          <Text style={styles.textSize}>Cancel</Text>
        </TouchableOpacity>
      </BottomSheet>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
  textSize: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    color: 'black',
  },
});

export default BottomSheetComponent;
