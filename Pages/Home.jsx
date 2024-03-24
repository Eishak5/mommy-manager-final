import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalContext } from '../Context/GlobalContext'
import EventList from '../Components/EventList'
import { useTheme } from '@react-navigation/native'

const Home = () => {
    const { todos, todoLoading, getTodos } = useContext(GlobalContext)
    const { colors } = useTheme()
    useEffect(() => {
        getTodos()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.text }]}>Today</Text>
                {
                    todoLoading ? <View style={{ flex: 1, marginTop: 100, justifyContent: "center" }}>
                        <ActivityIndicator size={100} />
                    </View> : <View style={{ paddingTop: 10 }}>
                        {todos?.length ? <EventList todos={todos} /> : <Text style={{ textAlign: "center", fontSize: 20, color: colors.text }}>There no data</Text>}
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    }

})