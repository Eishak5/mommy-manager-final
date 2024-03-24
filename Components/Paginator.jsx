import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

const Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions()

    return (
        <View style={styles.container}>
            {
                (data || []).map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp'
                    })
                    return <Animated.View key={`paginatorItem${i}`} style={[styles.dot, { width: dotWidth }]} />
                })
            }
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom:20
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8,
        backgroundColor: '#0E0E0E',
    }
})