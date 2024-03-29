import { FC, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
import BottomSheetComponent from '@ui/BottomSheet';
import CarouselCards from '@ui/CarouselCards';
import MenuContent from '@ui/Menu';

interface PropsType{};

const Home:FC<PropsType> = () => {
    const [username, setUsername] = useState('Md Rasimul Islam');

  //menu
  const [visible, setVisible] = useState<boolean>(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  //bottom sheet
  const [isVisible1, setIsVisible1] = useState<boolean>(false);
  return (
    <View style={styles.homeScreenView}>
      <View>
        <View style={styles.avham}>
          <View style={styles.textContainer}>
            <Text style={styles.textGreeding}>Hello</Text>
            <Text style={styles.textName}>{username}👋</Text>
            <Text style={styles.textWords}>Lets defeat skin concerns</Text>
          </View>
          <Avatar size={50} rounded source={require('../images/profile.png')} />
        </View>

       
      </View>
      <View style={styles.scanSection}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.scanSectionText}>Your Scans</Text>
          <TouchableOpacity onPress={showMenu} style={styles.menuBtnContainer}>
            <MenuContent
              visible={visible}
              showMenu={showMenu}
              hideMenu={hideMenu}></MenuContent>
            <Image
              source={require('../images/down.png')}
              style={styles.downArrowStyle}></Image>
          </TouchableOpacity>
        </View>
        <CarouselCards></CarouselCards>
      </View>

      <View style={styles.tabContainerOutside}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.chatBotContainer}>
            <View style={styles.tabChatImageOutside}>
              <Image
                source={require('../images/messenger.png')}
                style={styles.tabChatImage}></Image>
            </View>
            <Text style={styles.tabChatText}>Chat </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.scanContainer}
            onPress={() => setIsVisible1(true)}>
            <View style={styles.tabScannerImageOutside}>
              <Image
                source={require('../images/scanner.png')}
                style={styles.tabScannerImage}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileContainer}>
            <Text style={styles.tabProfileText}>Profile</Text>
            <View style={styles.tabProfileImageOutside}>
              <Image
                source={require('../images/user.png')}
                style={styles.tabProfileImage}></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetComponent
        isVisible1={isVisible1}
        setIsVisible1={setIsVisible1}></BottomSheetComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  menuBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    marginRight: 10,
  },
  downArrowStyle: {
    width: 30,
    height: 30,
  },
  tabContainerOutside: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  tabChatImageOutside: {
    backgroundColor: '#8889CC',
    padding: 12,
    borderRadius: 50,
  },
  tabScannerImageOutside: {
    backgroundColor: '#FBA968',
    padding: 11,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#6A6BBF',
    justifyContent: 'center',
    position: 'relative',
    top: 5,
  },
  tabProfileImageOutside: {
    backgroundColor: '#8889CC',
    padding: 11,
    borderRadius: 50,
  },
  tabChatImage: {
    height: 25,
    width: 25,
  },
  tabChatText: {
    color: '#fff',
    fontSize: 18,
    position: 'relative',
    top: 10,
    paddingHorizontal: 3,
    textAlign:'center',
  },
  tabScannerImage: {
    height: 30,
    width: 30,
  },
  tabProfileImage: {
    height: 25,
    width: 25,
    position: 'relative',
    left: 2,
  },
  tabProfileText: {
    color: '#fff',
    fontSize: 18,
    position: 'relative',
    top: 10,
    paddingHorizontal: 3,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '65%',
  },
  chatBotContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#6A6BBF',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'space-between',
    position: 'relative',
    right: -7,
    width: '60%',
  },
  scanContainer: {
    zIndex: 1,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#6A6BBF',
    padding: 12,
    borderRadius: 30,
    justifyContent: 'space-between',
    position: 'relative',
    left: -7,
    width: '60%',
  },
  scanSection: {
    width: '100%',
    height: '40%',
    // borderWidth: 2,
    borderColor: '#000',
  },
  scanSectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
  },
  homeScreenView: {
    backgroundColor: '#D7E1E3',
    height: '100%',
  },
  inputStyle: {},
  inputContainerStyle: {
    padding: 5,
    backgroundColor: '#FAF8F4',
    elevation: 3,
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  containerStyle: {
    backgroundColor: '#D7E1E3',
    borderColor: 'transparent',
  },
  seachBarContainer: {
    padding: 10,
    // borderWidth: 2,
    // borderColor: '#000',
  },
  avham: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  textContainer: {
    // margin: 15,
    // borderWidth: 2,
    // borderColor: '#000',
  },
  textGreeding: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  textWords: {
    // fontSize: 15,
    // color: '#000',
  },
});

export default Home;