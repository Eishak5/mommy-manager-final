import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ThemeItem from '../Components/ThemeItem';
import { Separator } from "react-native-btr";
const ThemeSelect = () => {
    const [data, setData] = useState([
        {
            id: "theme1",
            name: "Theme 1",
            color: "#57096A"
        },
        {
            id: "theme2",
            name: "Theme 2",
            color: "#212582"
        },
        {
            id: "theme3",
            name: "Theme 3",
            color: "#3E869D"
        },
        {
            id: "theme4",
            name: "Theme 4",
            color: "#519186"
        },

    ])
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    function toggle(index) {
        const item = data[index];
        item.checked = !item.checked;
        setData([...data]);
    }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginBottom: 10, marginTop: 40 }}>
                Create to do list
            </Text>
            <Text style={{ fontSize: 14, textAlign: "center", color: "#767E8C", marginBottom: 10 }} >
                Choose your to do list color theme:
            </Text>
            <FlatList
                data={data}
                scrollEnabled
                renderItem={({ item, index }) => <ThemeItem item={item} index={index} toggle={toggle} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Separator />}
            />
            <View style={{ height: 56, marginBottom: 40, flexDirection: "row", paddingHorizontal: 30 }}>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("dashboard")}>
                    <Text style={{ fontSize: 20 }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ThemeSelect

const styles = StyleSheet.create({
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