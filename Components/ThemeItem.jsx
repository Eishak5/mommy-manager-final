import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { CheckBox } from 'react-native-btr';
import ImageSkelton from "../assets/Group 34851.png"

const ThemeItem = ({ item, index, toggle }) => {
    // console.log("label,style", item, index);
    const {width}=useWindowDimensions()
    return (
        <View style={styles.row}>
            <View style={{ width: 20, marginBottom: 20 }}>
                <CheckBox
                    checked={item.checked}
                    color={item.color}
                    disabled={item.disabled}
                    onPress={() => toggle(index)}
                />
            </View>
            <View>
                <View >
                    <Text style={[styles.label,{ backgroundColor: item.color, paddingHorizontal: 16, paddingVertical: 8, borderTopRightRadius: 8, borderTopLeftRadius: 8 }]}>{item.name}</Text>
                    <View style={{paddingHorizontal:20,paddingVertical:16,
                      backgroundColor: '#FBFBFB',
                      borderBottomRightRadius:8,
                      borderBottomLeftRadius:8
                    }}>
                    <Image source={ImageSkelton} style={{ alignSelf: 'stretch' }} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ThemeItem

const styles = StyleSheet.create({
    row: {
        backgroundColor: "#fff",
        padding: 16,
    },
    label: {
        flex: 1,
        color: 'white',
    },
})