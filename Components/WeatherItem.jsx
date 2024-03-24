import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const WeatherItem = ({ data }) => {
  const {colors}=useTheme()
  const shortMonthDate = (val) => {
    const date = new Date(val);
    const option = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleString("en-us", option);
  };

  const timeOnly = (val) => {
    const date = new Date(val);
    const option = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-us", option);
  };

  return (
    <View style={[styles.container,{backgroundColor:colors.card}]}>
      <Text style={[styles.tempHeading,{color:colors.text}]}>
        {(data?.main.temp - 273.15).toFixed(2)}°C
      </Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${
            data?.weather ? data?.weather[0]?.icon : ""
          }@2x.png`,
        }}
        style={styles.icon}
      />
      <Text style={[styles.timeText,{color:colors.text}]}>{timeOnly(data.dt_txt)}</Text>
      <Text style={[styles.dateText,{color:colors.lightGrey}]}>{shortMonthDate(data.dt_txt)}</Text>
    </View>
  );
};

export default WeatherItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginRight: 15,
    marginLeft: 10,
    height: 140,
    width: 120,
    borderRadius: 10,
    marginBottom: 70,
    alignItems: 'center', // Center align content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  tempHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
    
  },
  timeText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  dateText: {
    color: "#B3AEAE",
    fontSize: 13,
    marginTop: 5,
  },
});
