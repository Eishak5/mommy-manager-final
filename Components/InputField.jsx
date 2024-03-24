import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@react-navigation/native'

const InputField = ({ multiline, value, label, onChangeText, type, keyboardType, height }) => {
   const {colors}=useTheme()
    return (
        <View>
            <Text style={[styles.label,{color:colors.text}]}>{label}</Text>
            <TextInput style={[styles.inputField, height === "big" && { height: 150,verticalAlign:"top" }]} value={value} type={type} keyboardType={keyboardType} onChangeText={onChangeText} multiline={multiline} />
        </View>
    )
}

InputField.propTypes = {
    multiline: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    onChangeText: PropTypes.func,
    keyboardType: PropTypes.string,
    height: PropTypes.string
}

export default InputField


const styles = StyleSheet.create({
    label: {
        fontSize: 20,

    },
    inputField: {
        height: 56,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: 20,
        alignSelf: 'stretch',
        backgroundColor: "#F6F7F9",
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#999",
    }
})