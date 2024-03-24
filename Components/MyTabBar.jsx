import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AppIcons from "./Utilities/AppIcons";
import PropTypes from 'prop-types'
import { useTheme } from '@react-navigation/native';

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme()
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index + "routes"}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tab, 
              { borderTopColor: isFocused ? colors.primary : "transparent" }
            ]}
          >
            <AppIcons type={label} size={30} color={isFocused ? colors.primary : colors.lightGrey} />

            {/* <Text>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
MyTabBar.propTypes = {
  state: PropTypes.object.isRequired,
  descriptors: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}
export default MyTabBar;
const styles = StyleSheet.create({
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 20,
    borderTopColor:"red",
    borderTopWidth: 2,
  }
})