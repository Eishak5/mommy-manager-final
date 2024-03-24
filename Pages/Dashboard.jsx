import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import MyTabBar from '../Components/MyTabBar';
import Events from './Events';
import Weather from './Weather';
import NewEvent from './NewEvent';
import Settings from './Settings';

const Tab = createBottomTabNavigator();
const Dashboard = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <MyTabBar {...props} />} initialRouteName="settings">
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="events" component={Events} />
      <Tab.Screen name="newevent" component={NewEvent} />
      <Tab.Screen name="weather" component={Weather} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default Dashboard

const styles = StyleSheet.create({

})