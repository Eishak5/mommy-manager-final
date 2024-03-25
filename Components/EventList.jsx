import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventItem from './EventItem'

const EventList = ({ todos }) => {
    console.log(todos);
    
    return (
        <FlatList data={todos} keyExtractor={item => item.id} renderItem={({ item }) => <EventItem data={item} />} />
    )
}

export default EventList

const styles = StyleSheet.create({})