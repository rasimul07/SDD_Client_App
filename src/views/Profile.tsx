import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface PropsType{};

const Profile: FC<PropsType> = (props) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to Profile</Text>
        </View>
)}

const styles = StyleSheet.create({
container:{},
})
export default Profile;