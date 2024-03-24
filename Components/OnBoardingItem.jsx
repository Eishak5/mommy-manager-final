import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
// import { Image } from 'expo-image'

const OnBoardingItem = ({ item }) => {
    const { width } = useWindowDimensions()
    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width }]} />
            <View style={styles.textArea}>
                <Text style={styles.heading}>{item.name}</Text>
                <Text style={{textAlign:"center"}}>{item.description}</Text>
            </View>
        </View>
    )
}

export default OnBoardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:"relative"
    },
    textArea: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:-200,
        paddingHorizontal: 30,

    },
    heading:{
        fontSize:25,
        marginBottom:20,
        marginTop:-20,
        fontWeight:"bold",
        textAlign:"center"
    },
    image: {
        flex: 0.7,
        justifyContent: "center",
        resizeMode: "contain"
    }
})