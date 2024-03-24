import { FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import React, { useContext, useRef, useState } from "react";
import WeatherItem from "./WeatherItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobalContext } from "../Context/GlobalContext";
import { useTheme } from "@react-navigation/native";

const HourlyWeatherInfo = () => {
  const { colors } = useTheme()
  const { hourlyWeather } = useContext(GlobalContext);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollToForecast = () => {
    // Calculate the next index, assuming you want to loop back to 0 when reaching the end
    const nextIndex = (currentIndex + 1) % hourlyWeather.list.length;
    setCurrentIndex(nextIndex);

    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.hourlytext,{color:colors.text}]}>24-hour Forecast</Text>
        <TouchableOpacity onPress={handleScrollToForecast} style={styles.daysForecastContainer}>
          <Text style={styles.daysforecast}>5-Days Forecast</Text>
          <MaterialCommunityIcons name="chevron-right" size={15} color="#B3AEAE" />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        style={styles.list}
        data={hourlyWeather.list}
        renderItem={({ item }) => <WeatherItem data={item} />}
      />
    </View>
  );
};

export default HourlyWeatherInfo;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "rgba(255, 255, 255, 0.065)", // Transparent white background
    padding: 10,
    height: 165,
    marginBottom: 70,

  },
  container: {
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  hourlytext: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
  daysForecastContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  daysforecast: {
    fontSize: 14,
    color: "#B3AEAE",
    marginRight: 5,
  },
});
