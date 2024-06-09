import {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Card, Image} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import VerticalDotMenu from './VerticalDotMenu';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UserStackParamList } from '@src/@types/navigation';
import client from '@src/api/client';
import { getFromAsyncStorage, Keys } from '@utils/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { updatePredictionUpdatehappenState } from '@src/store/auth';

interface PropsType {
  item: {
    url: string;
    publicId: string;
    prediction: string | null;
  };
  index:number
}

const ScanImageCard: FC<PropsType> = props => {
    const [visible, setVisible] = useState<boolean>(false);
     const hideMenu = () => setVisible(false);
     const showMenu = () => setVisible(true);
     const dispatch = useDispatch();
     const navigation = useNavigation<NavigationProp<UserStackParamList>>();

     const handleGetPrediction = async (index: number) => {
       dispatch(updatePredictionUpdatehappenState(true));
       try {
         const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
         const {data} = await client.post(
           '/photo/getPrediction',
           {index: index},
           {
             headers: {
               Authorization: 'Bearer ' + token,
               'Content-Type': 'application/json',
             },
           },
         );
       } catch (error) {
         console.log(error);
       }
       dispatch(updatePredictionUpdatehappenState(false));
     };
 const handleResult = (index: number) => {
   navigation.navigate('Result', {index});
 };
    if (props.item.prediction === null){
      handleGetPrediction(props.index);
    }
      return (
        <SafeAreaView>
          <View style={styles.cardContainer}>
            <View style={styles.cardStyle2}>
              <Pressable
                style={{display: 'flex', flexDirection: 'row'}}
                onPress={() => handleResult(props.index)}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  PlaceholderContent={<ActivityIndicator />}
                  source={{uri: props.item.url}}></Image>
                <View style={styles.predictionTexts}>
                  <Text style={styles.textColor}>prediction</Text>
                  <Text style={styles.textColor}>
                    {props.item.prediction
                      ? props.item.prediction
                      : 'predicting...'}
                  </Text>
                </View>
              </Pressable>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <VerticalDotMenu
                  visible={visible}
                  hideMenu={hideMenu}
                  showMenu={showMenu}
                  index={props.index}></VerticalDotMenu>
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container: {},
  textColor:{
    color:'#000'
  },
  cardContainer: {
    borderRadius: 5,
    borderRightColor: colors.SECONDARY,
    borderRightWidth: 10,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    shadowColor: 'gray',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  predictionTexts: {},
  cardStyle2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
});
export default ScanImageCard;
