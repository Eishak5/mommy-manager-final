import React, { useCallback, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GlobalContext } from "../Context/GlobalContext";
import { useTheme } from "@react-navigation/native";

const WeatherDetailsHome = () => {
  const { colors } = useTheme()
  const { hourlyWeather } = useContext(GlobalContext);
  const weather = useCallback(() => {
    if (hourlyWeather?.list?.length > 0) return hourlyWeather?.list[0];
    return {};
  }, [hourlyWeather])();
  const { city } = hourlyWeather || {};
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={[styles.nameText, { color: colors.text }]}>{city?.name}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={[styles.imgWrapper,{backgroundColor:colors.card}]}>
            <Image
              style={styles.img}
              source={{
                uri: `https://openweathermap.org/img/wn/${weather?.weather ? weather?.weather[0]?.icon : ""
                  }@2x.png`,
              }}
            />
          </View>
          <Text style={[styles.tempstyle,{color:colors.text}]}>
            {(weather?.main?.temp - 273.15).toFixed(2)}°C
          </Text>
        </View>

        <Text style={[styles.desc,{color:colors.lightGrey}]}>
          {
            (weather?.weather?.length > 0 ? weather?.weather[0] : {})
              .description
          }
        </Text>
        <View style={styles.weatherinfoextra}>
          <View style={[styles.weatherinfo,{backgroundColor:colors.card}]}>
            <Text style={[styles.feelstext1,{color:colors.lightGrey}]}>Feels like</Text>
            <Text style={[styles.feelstext,{color:colors.text}]}>{weather?.main?.feels_like}°C</Text>
            <Image
              style={styles.iconssmall}
              source={require("../assets/temperatureicon.png")}
            />
          </View>
          <View style={[styles.weatherinfo,{backgroundColor:colors.card}]}>
            <Text style={[styles.feelstext1,{color:colors.lightGrey}]}>Humidity</Text>
            <Text style={[styles.feelstext,{color:colors.text}]}>{weather?.main?.humidity}%</Text>
            <Image
              style={styles.iconssmall}
              source={require("../assets/humidityicon.jpg")}
            />
          </View>
        </View>
        <View style={styles.weatherinfoextra}>
        <View style={[styles.weatherinfo,{backgroundColor:colors.card}]}>
            <Text style={[styles.feelstext1,{color:colors.lightGrey}]}>Visibility</Text>
            <Text style={[styles.feelstext,{color:colors.text}]}>{weather?.visibility}</Text>
            <Image
              style={styles.iconssmall}
              source={require("../assets/temperatureicon.png")}
            />
          </View>
          <View style={[styles.weatherinfo,{backgroundColor:colors.card}]}>
            <Text style={[styles.feelstext1,{color:colors.lightGrey}]}>Pressure</Text>
            <Text style={[styles.feelstext,{color:colors.text}]}>{weather?.main?.pressure} mph</Text>
            <Image
              style={styles.iconssmall}
              source={require("../assets/pressureicon.png")}
            />
          </View>
        </View>
        <View style={styles.weatherinfoextra}>
        <View style={[styles.weatherinfo,{backgroundColor:colors.card}]}>
            <Text style={[styles.feelstext1,{color:colors.lightGrey}]}>Sunrise</Text>
            <Text style={[styles.feelstext,{color:colors.text}]}>
              {new Date(
                (city?.sunrise || 0) * 1000
              ).toLocaleString()}
            </Text>

            <Image
              style={styles.iconssmall}
              source={require("../assets/sunriseicon.png")}
            />
          </View>
          <View style={[styles.weatherinfo,{backgroundColor:colors.card}]}>

            <Text style={[styles.feelstext1,{color:colors.lightGrey}]}>Sunset</Text>
            <Text style={[styles.feelstext,{color:colors.text}]}>
              {new Date(
                (city?.sunset || 0) * 1000
              ).toLocaleString()}
            </Text>
            <Image
              style={styles.iconssmall}
              source={require("../assets/sunseticon.png")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WeatherDetailsHome;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 15,
  },
  nameText: {
    width: "100%",
    textAlign: "center",
    fontSize: 25,
    // color: "white",
    marginTop: 10,
    padding: 10,
  },
  imgWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 10,
    width:110,
    height:110,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    marginLeft: 10,
    width: 100,
    height: 100,
  },
  tempstyle: {
    marginLeft: 10,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  desc: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
    color: "#B3AEAE",
    marginBottom: 30,
  },
  weatherinfoextra: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 7,
  },
  weatherinfo: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent white background
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    height: Dimensions.get("screen").height / 8.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },

  iconssmall: {
    height: 50, // Increase the height
    width: 50, // Increase the width
    marginLeft: 75, // Adjust the marginLeft as needed
    borderRadius: 30,
  },
  feelstext: {
    color: "white",
    fontSize: 15,
  },
  feelstext1: {
    fontSize: 12,
    color: "#B3AEAE",
  },

});
