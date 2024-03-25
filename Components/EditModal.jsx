import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AppIcons from './Utilities/AppIcons';
import { useTheme } from '@react-navigation/native';
import InputField from './InputField';
import TimeDateComp from './TimeDateComp';
import { GlobalContext } from '../Context/GlobalContext';

const EditModal = ({ visiable, setVisiable, data }) => {
    const { colors } = useTheme()
    const { updateTodo, todoLoading } = useContext(GlobalContext)
    const [date, setDate] = useState(new Date(data.date?.seconds * 1000))
    const [title, setTitle] = useState(data?.title || '')
    const [detail, setdetail] = useState(data?.detail || "")
    const [priority, setPriority] = useState(data?.priority || "")
    const saveData = async () => {
        if (!title) {
            Alert.alert("Error", "Title is required")
        }
        else {
            const response = await updateTodo(data.id, {
                title,
                detail,
                date,
                priority
            })
            if (response) {
                setVisiable(false)
            }
        }
    }
    return (
        <Modal
            visible={visiable}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setVisiable(false)
            }} >
            <View style={styles.centeredView}>
                <View style={[styles.modalView,{backgroundColor:colors.background}]}>
                    <Pressable
                        style={[styles.buttonClose]}
                        onPress={() => setVisiable(false)}>
                        <AppIcons type={"close"} size={30} color={colors.text} />

                    </Pressable>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <ScrollView keyboardDismissMode="on-drag">
                            <Text style={styles.title}>Edit Task</Text>
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
                                    todoLoading ? <ActivityIndicator /> :
                                        <Text style={{ fontSize: 20, color: colors.white }}>Update</Text>
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    )
}

export default EditModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative"
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        width: '80%',
        paddingTop: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        position: "absolute",
        top: 5,
        right: 5,
    },
    title: {
        fontSize: 26,
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
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})