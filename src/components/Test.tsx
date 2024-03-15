import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PropsType{}

const Test: FC<PropsType> = () => {
  return (
    <View style={styles.container}>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{}
})
export default Test
