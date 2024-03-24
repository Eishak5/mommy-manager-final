import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../Context/GlobalContext';

const Signup = () => {
    const navigation = useNavigation();
    const { width } = useWindowDimensions()
    const { signUpWithEmailPassword,signupLoading } = useContext(GlobalContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const validateEmail = () => {
        if (!email) {
            setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password is required');
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };
    // signUpWithEmailPassword
    const dataSubmit = () => {
        validateEmail();
        validatePassword();

        // Proceed with form submission if no errors
        if (!emailError && !passwordError) {
            signUpWithEmailPassword(email, password)

            console.log('Form submitted successfully');
        }
    }
    // console.log('signupLoading',signupLoading);
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
                Create account
            </Text>
            <Text style={{ fontSize: 14, textAlign: "center", color: "#767E8C", marginBottom: 30 }} >
                Create your account and feel the benefits
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }} >
                Email
            </Text>
            <TextInput placeholder='name@example.com' onChangeText={setEmail} style={styles.inputField} />
            {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
            <Text style={{ fontSize: 16, fontWeight: "bold" }} >
                Password
            </Text>
            <TextInput secureTextEntry={true} placeholder='Enter your password' onChangeText={setPassword} style={styles.inputField} />
            {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
            <View style={{ height: 56, marginTop: 30, flexDirection: "row" }}>
                <TouchableOpacity style={styles.nextButton} onPress={dataSubmit}>
                    <Text style={{ fontSize: 20 }}>Sign up</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E0E5ED' }} />
                <View>
                    <Text style={{ width: 100, textAlign: 'center', color: "#767E8C" }}>or continue with</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E0E5ED' }} />
            </View> */}
            <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", width }}>
                <Text >
                    I have an account&nbsp;
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("login")}>
                    <Text style={{ color: "#2A8FC2" }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20
    },
    inputField: {
        height: 56,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        alignSelf: 'stretch',
        backgroundColor: "#F6F7F9",
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E0E5ED"

    },
    nextButton: {
        flex: 1,
        backgroundColor: "#D9D9D9",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10

    },
})