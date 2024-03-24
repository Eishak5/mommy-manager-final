import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../Context/GlobalContext';
import helpers from '../Helper/helpers';
const Login = () => {
    const navigation = useNavigation();
    const { width } = useWindowDimensions()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { signInWithEmailPassword } = useContext(GlobalContext)
    const validateEmail = () => {
        if (!email) {
            setEmailError('Email is required');
        } else if (!helpers.isEmail(email)) {
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
            signInWithEmailPassword(email, password)

            console.log('Form submitted successfully');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginBottom: 30 }}>Welcome back!</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }} >
                Email Address
            </Text>
            <TextInput placeholder='name@example.com' style={styles.inputField} onChangeText={setEmail} />
            <Text style={{ fontSize: 16, fontWeight: "bold" }} >
                Password
            </Text>
            <TextInput secureTextEntry={true} placeholder='Enter your password' style={styles.inputField} onChangeText={setPassword} />
            <View style={{ height: 56, marginTop: 30, flexDirection: "row" }}>
                <TouchableOpacity style={styles.nextButton} onPress={dataSubmit}>
                    <Text style={{ fontSize: 20 }}>Login</Text>
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
                <Text style={{ textAlign: "center" }}>
                    don't have an account&nbsp;
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                    <Text style={{ color: "#2A8FC2", }}>
                        create new one
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

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