import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import helpers from '../Helper/helpers';

const TimeDateComp = ({ title, date, setDate, mode }) => {
    const [show, setShow] = useState(false)
    const onChange = (event) => {
        setDate(new Date(event.nativeEvent.timestamp))
        setShow(false)
    }
    return (
        <View>
            <Text style={styles.label}>{title}</Text>
            <TouchableOpacity onPress={() => setShow(true)}>
                <Text style={styles.datetime}>
                    {mode === "time" ? helpers.timeOnly(date) : helpers.MonthYearDate(date)}
                </Text>
            </TouchableOpacity>
            {
                show && <DateTimePicker display='default' onChange={onChange} testID="dateTimePicker" mode={mode} is24Hour value={date} />
            }
        </View>
    )
}
TimeDateComp.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.any.isRequired,
    setDate: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(["date", "time"]).isRequired
}
export default TimeDateComp

const styles = StyleSheet.create({
    label: {
        fontSize: 20,

    },
    datetime: {
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
        verticalAlign: "middle"
    }
})