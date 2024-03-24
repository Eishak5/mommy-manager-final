import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import HourlyWeatherInfo from "../Components/HourlyWeatherInfo";
import WeatherDetailsHome from "../Components/WeatherDetailsHome";
import { StatusBar } from "expo-status-bar";
import { GlobalContext } from "../Context/GlobalContext";

const Weather = () => {
    const { location, getInfo, hourlyWeatherLoading, getPermissions } =
        useContext(GlobalContext);
    const { latitude, longitude } = location?.coords || {};
    useEffect(() => {
        if (latitude && longitude) {
            getInfo(latitude, longitude);
        }
    }, [location]);
    useEffect(() => {
        getPermissions();
    }, []);

    return (
        hourlyWeatherLoading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={100} />
        </View> :
            <SafeAreaView style={{ paddingTop: 50, flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, }}>
                        <StatusBar translucent backgroundColor="transparent" />
                        <WeatherDetailsHome />
                        <HourlyWeatherInfo />
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
};

export default Weather;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
    },
});
