import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';


import { months } from '@utils/helper';
import { Double_arrow } from '@ui/logo';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList, UserStackParamList } from '@src/@types/navigation';


const GetStartedScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView>
      <View>
        <LinearGradient
          colors={['#a7a8d9', '#6D6EC0']}
          style={styles.gradientColor}>
          <View style={styles.circle1}></View>
          <View style={styles.circle2}></View>
          <View style={styles.circle3}></View>
          <View style={styles.circle4}></View>
          <View style={styles.circle5}></View>

          <View style={styles.activityContainer}>
            <View style={styles.titleView}>
              <Text style={styles.title}>AI SKINIFY</Text>
              <Text style={styles.subHeading}>Your Skin Health Companion!</Text>
            </View>
            <TouchableOpacity
              style={styles.GetStatedCircle}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              <View style={styles.iconBox}>
                <Double_arrow></Double_arrow>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.flowerContainer}>
            <View style={styles.stick1}></View>
            <View style={styles.stick2}></View>
            <View style={styles.stick3}></View>
          </View>
          <View style={styles.monthDateBox}>
            <Text style={styles.month}>
              {months[currentDateTime.getMonth()]}
            </Text>
            <Text style={styles.date}>{currentDateTime.getDate()}</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.time}>
              {currentDateTime.getHours()}:{currentDateTime.getMinutes()}
            </Text>
            <Text style={styles.meridiem}>
              {currentDateTime.getHours() >= 12 ? 'PM' : 'AM'}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  firstIcon: {
    position: 'relative',
    left: 2,
  },
  secondIcon: {
    position: 'relative',
    right: 2,
  },
  activityContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-around',
    bottom: '7%',
    width: '100%',
  },
  monthDateBox: {
    width: 80,
    height: 100,
    backgroundColor: '#c5c5e6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 80,
  },
  month: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 0,
    margin: 0,
    color: '#000',
  },
  date: {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 0,
    margin: 0,
    color: '#000',
  },
  timeBox: {
    width: 100,
    height: 110,
    backgroundColor: '#F9DAC6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 270,
    left: 200,
  },
  time: {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 0,
    margin: 0,
    color: '#000',
  },
  meridiem: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 0,
    margin: 0,
    color: '#000',
  },
  flowerContainer: {
    position: 'relative',
    top: 330,
    left: 25,
  },
  stick1: {
    position: 'absolute',
    width: 80,
    height: 19,
    backgroundColor: '#a7a8d9',
    borderRadius: 10,
  },
  stick2: {
    width: 80,
    height: 19,
    backgroundColor: '#a7a8d9',
    borderRadius: 10,
    position: 'absolute',
    transform: [{rotate: '120deg'}],
  },
  stick3: {
    width: 80,
    position: 'absolute',
    height: 19,
    backgroundColor: '#a7a8d9',
    borderRadius: 10,
    transform: [{rotate: '240deg'}],
  },
  circle1: {
    width: 360,
    height: 350,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 500,
    position: 'absolute',
    left: -5,
    top: 60,
    transform: [{scaleY: 1.5}],
  },
  circle2: {
    width: 250,
    height: 250,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 500,
    position: 'absolute',
    top: 0,
    left: '40%',
    transform: [{scaleY: 1.5}],
  },
  circle3: {
    width: 250,
    height: 250,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 500,
    position: 'absolute',
    top: 200,
    left: '40%',
    transform: [{scaleY: 1.5}],
  },
  circle4: {
    width: 150,
    height: 150,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 500,
    position: 'absolute',
    top: 120,
    left: '20%',
    transform: [{scaleY: 1.5}],
  },
  circle5: {},
  GetStatedCircle: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    position: 'relative',
    bottom: 7,
    right: 7,
  },
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleView: {},
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subHeadingView: {
    position: 'absolute',
    bottom: 80,
    left: 25,
  },
  subHeading: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    borderWidth: 5,
    padding: 20,
  },
  button: {
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container1: {
    width: '100%',
    height: 250,
  },
  gradientColor: {
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 5,
    borderStyle: 'solid',
  },
});
