import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import InputField from '../Components/InputField'
import { useTheme } from '@react-navigation/native'
import AvatarImg from '../Components/AvatarImg'
import { GlobalContext } from '../Context/GlobalContext'
import AppIcons from '../Components/Utilities/AppIcons'

const Settings = () => {
    const { colors } = useTheme()
    const { getCurrentUser, logout, changeColorMode, currentUserLoading, currentUser, updateCurrentUser } = useContext(GlobalContext)
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
    })
    const saveData = async () => {
        const response = await updateCurrentUser(currentUser?.id, userInfo)
        if (response) {
            Alert.alert("success", "Profile update successfull")
        }
    }
    useEffect(() => {
        getCurrentUser()
    }, [])
    useEffect(() => {
        if (currentUser)
            setUserInfo(currentUser)
    }, [currentUser])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar translucent backgroundColor="transparent" />
                <TouchableOpacity onPress={changeColorMode} style={[styles.themeMode, { backgroundColor: colors.text }]}>
                    <AppIcons type={"day"} color={colors.background} />
                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
                <AvatarImg />
                <InputField label={"First Name"} type="text" value={userInfo.firstName} onChangeText={e => setUserInfo(prev => ({ ...prev, firstName: e }))} />
                <InputField label={"Last Name"} type="text" value={userInfo.lastName} onChangeText={e => setUserInfo(prev => ({ ...prev, lastName: e }))} />
                <InputField label={"Phone"} type="text" value={userInfo.phone} onChangeText={e => setUserInfo(prev => ({ ...prev, phone: e }))} />
                <InputField label={"Address"} height={"big"} multiline type="text" value={userInfo.address} onChangeText={e => setUserInfo(prev => ({ ...prev, address: e }))} />
                <TouchableOpacity disabled={currentUserLoading} style={[styles.nextButton, { backgroundColor: colors.primary }]} onPress={saveData}>
                    {
                        currentUserLoading ?
                            <ActivityIndicator /> :
                            <Text style={{ fontSize: 20, color: colors.white }}>Save</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={[styles.nextButton, { backgroundColor: colors.danger }]} onPress={logout}>
                    <Text style={{ fontSize: 20, color: colors.white }}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30
    },
    themeMode: {
        backgroundColor: "red",
        borderRadius: 10,
        position: "absolute",
        top: 15,
        right: 15,
        padding: 10,
        zIndex:5
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    nextButton: {
        width: 200,
        height: 50,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})