import React from "react";
import PropTypes from "prop-types";
import { MaterialCommunityIcons, Entypo, Feather, AntDesign, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
const AppIcons = ({ type, size, color }) => {
  switch (type?.toLowerCase()) {
    case "notifications":
      return <Ionicons name="notifications" size={size} color={color} />;
    case "calendar":
    case "events":
      return <Ionicons name="calendar" size={size} color={color} />;
    case "settings":
      return <Ionicons name="settings" size={size} color={color} />;
    case "close":
      return <AntDesign name="close" size={size} color={color} />;
    case "arrowdown":
      return <AntDesign name="arrowdown" size={size} color={color} />;
    case "arrowup":
      return <AntDesign name="arrowup" size={size} color={color} />;
    case "newevent":
      return <AntDesign name="plussquare" size={size} color={color} />;
    case "logout":
      return <AntDesign name="logout" size={size} color={color} />;
    case "users":
    case "venders":
      return <FontAwesome name="users" size={size} color={color} />;
    case "camera":
      return <FontAwesome name="camera" size={size} color={color} />;
    case "edit":
      return <FontAwesome name="edit" size={size} color={color} />;
    case "home":
      return <Entypo name="home" size={size} color={color} />;
    case "user":
    case "information":
      return <Entypo name="user" size={size} color={color} />;
    case "box":
      return <Feather name="box" size={size} color={color} />;
    case "cake":
      return <MaterialCommunityIcons name="cake" size={size} color={color} />;
    case "delete":
      return <MaterialCommunityIcons name="delete" size={size} color={color} />;
    case "complete":
      return <MaterialCommunityIcons name="clipboard-check-multiple" size={size} color={color} />;
    case "clock":
      return <MaterialCommunityIcons name="clock" size={size} color={color} />;
    case "weather":
    case "cloud":
      return <MaterialCommunityIcons name="apple-icloud" size={size} color={color} />;
    case "media":
    case "photo":
      return <MaterialIcons name="perm-media" size={size} color={color} />;
    case "day":
    case "sunny":
      return <MaterialIcons name="sunny" size={size} color={color} />;
    case "night":
    case "moon":
      return <MaterialIcons name="nightlight" size={size} color={color} />;
    case "search":
      return <Feather name="search" size={size} color={color} />;
    default:
      return <Feather name="box" size={size} color={color} />;
  }
};

AppIcons.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};
AppIcons.defaultProps = {
  type: "",
  size: 20,
  color: "#007BFF",
};

export default AppIcons;
