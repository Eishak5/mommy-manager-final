import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import TimeDateComp from '../Components/TimeDateComp'
import InputField from '../Components/InputField'
import { useTheme } from '@react-navigation/native'
const NewEvent = () => {
    const { addTodo, todoLoading } = useContext(GlobalContext)
    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState('')
    const [detail, setdetail] = useState('')
    const [priority, setPriority] = useState("")
    const { colors } = useTheme()
    const saveData = async () => {
        if (!title) {
            Alert.alert("Error", "Title is required")
        }
        else {
            const response = await addTodo({
                title,
                detail,
                date,
                priority
            })
            if (response) {
                Alert.alert("Success", "Data save successfull")
                setTitle("")
                setdetail("")
                setPriority("")
                setDate(new Date())
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView keyboardDismissMode="on-drag" style={{ padding: 20 }}>
                    <Text style={[styles.title, { color: colors.text }]}>Add New Task</Text>
                    <InputField label={"Title"} type="text" value={title} onChangeText={e => setTitle(e)} />
                    <TimeDateComp date={date} title="Date" setDate={setDate} mode="date" />
                    <TimeDateComp date={date} title="Time" setDate={setDate} mode="time" />
                    <InputField label={"Detail"} height="big" type="text" multiline value={detail} onChangeText={e => setdetail(e)} />
                    <Text style={{ fontSize: 20 }}>
                        Priority
                    </Text>
                    <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: colors.danger, borderColor: priority === 'one' ? colors.text : colors.danger }]} onPress={() => setPriority("one")} />
                        <TouchableOpacity style={[styles.button, { backgroundColor: colors.secondary, borderColor: priority === 'two' ? colors.text : colors.secondary }]} onPress={() => setPriority("two")} />
                        <TouchableOpacity style={[styles.button, { backgroundColor: colors.success, borderColor: priority === 'three' ? colors.text : colors.success }]} onPress={() => setPriority("three")} />
                    </View>
                    <TouchableOpacity disabled={todoLoading} style={[styles.nextButton, { backgroundColor: colors.primary }]} onPress={saveData}>
                        {
                            todoLoading ?
                                <ActivityIndicator /> :
                                <Text style={{ fontSize: 20, color: colors.white }}>Add</Text>
                        }
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default NewEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 2
    },
    nextButton: {
        width: 200,
        height: 50,
        marginBottom: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})