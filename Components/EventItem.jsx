import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import helpers from '../Helper/helpers'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import AppIcons from './Utilities/AppIcons'
import { GlobalContext } from '../Context/GlobalContext'
import EditModal from './EditModal'

const EventItem = ({ data }) => {
    const { deleteTodo, updateTodo } = useContext(GlobalContext)
    const [visiable, setVisiable] = useState(false)
    const { colors } = useTheme()
    const deleteTask = () => Alert.alert('Delete', 'Are you sure about it?', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        { text: 'OK', onPress: () => deleteTodo(data.id) },
    ])
    const markComplete = () => Alert.alert('Mark as Complete', 'Are you sure about?', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        { text: 'OK', onPress: () => updateTodo(data.id, { status: "complete" }) },
    ])
    const LeftSwipe = () => {
        return (
            <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setVisiable(true)}>
                    <AppIcons type={"edit"} color={"#000"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteTask} style={[styles.button, { backgroundColor: "#FF4D4F" }]}>
                    <AppIcons type={"delete"} color={"#ffffff"} />
                </TouchableOpacity>
            </View>
        )
    }
    const RightSwipe = () => {
        return (
            <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.button} onPress={markComplete}>
                    <AppIcons type={"complete"} color={"#000"} />
                </TouchableOpacity>
            </View>
        )
    }
    return (<>
        <EditModal visiable={visiable} setVisiable={setVisiable} data={data} />
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Swipeable renderLeftActions={LeftSwipe} renderRightActions={() => RightSwipe(data.id)}>
                <View style={[styles.container, { backgroundColor: colors.background, shadowColor: colors.text }]}>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
                    </View>
                    {
                        data.detail &&
                        <Text style={{ paddingHorizontal: 5, color: colors.text }}>
                            {data.detail}
                        </Text>
                    }
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 5, marginHorizontal: 5, gap: 10 }}>
                        <View style={{ backgroundColor: data.priority === "one" ? colors.danger : data.priority === "two" ? colors.secondary : data.priority === "three" ? colors.success : "", width: 50, height: 16, borderRadius: 10 }}></View>
                        <Text style={{ textAlign: 'right', paddingHorizontal: 10, backgroundColor: data.status === "complete" ? "#20C997" : colors.lightGrey, color: "white", borderRadius: 5 }}>
                            {helpers.shortMonthDateTime(data.date?.seconds * 1000)}
                        </Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    </>
    )
}

export default EventItem

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
        paddingBottom: 5
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        // color: '#fff',

    },
    leftContainer: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: "row",
        // backgroundColor: 'green'
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }
})