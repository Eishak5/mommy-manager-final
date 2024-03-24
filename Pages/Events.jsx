import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { GlobalContext } from '../Context/GlobalContext';
import EventList from '../Components/EventList';
const Events = () => {
  const [selected, setSelected] = useState('');
  const { getTodosbyDate, todoFilterLoading, todoFilter } = useContext(GlobalContext)

  useEffect(() => {
    getTodosbyDate(selected ? new Date(selected) : new Date())
  }, [selected])
  return (
    <SafeAreaView style={{ paddingHorizontal: 10 }}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        style={{ borderRadius: 10 }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
      />
      {
        todoFilterLoading ?
          <View style={{ flex: 1, marginTop: 100, justifyContent: "center" }}>
            <ActivityIndicator size={100} />
          </View> : <View style={{ paddingTop: 10 }}>
            {todoFilter?.length ? <EventList todos={todoFilter} /> : <Text style={{ textAlign: "center", fontSize: 20 }}>There no data</Text>}
          </View>
      }
    </SafeAreaView>
  )
}

export default Events

const styles = StyleSheet.create({})