import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface PropsType{};

const Chat: FC<PropsType> = (props) => {
    return (
        <View style={styles.container}>
            <Text>Chat</Text>
        </View>
)}

const styles = StyleSheet.create({
container:{},
})
export default Chat;