import React, { useContext } from 'react'
import OnBorading from './Components/OnBoarding'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ThemeSelect from './Pages/ThemeSelect';
import Dashboard from './Pages/Dashboard';
import { GlobalContext } from './Context/GlobalContext';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { colors } from './Theme'
import { useColorScheme } from 'react-native';
const Stack = createNativeStackNavigator();

const Router = () => {
    const scheme = useColorScheme();
    const { user, colorMode } = useContext(GlobalContext)
    // console.log('user', user);
    return (
        <NavigationContainer theme={colorMode ? {
            ...DarkTheme, colors: {
                ...DarkTheme.colors,
                ...colors,
            }
        } : {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                ...colors
            }
        }}>
            <Stack.Navigator initialRouteName="getstarted" screenOptions={{ headerShown: false }}>
                {
                    user ?
                        <Stack.Screen name="dashboard" component={Dashboard} />
                        : <>
                            <Stack.Screen name="getstarted" component={OnBorading} />
                            <Stack.Screen name="login" component={Login} />
                            <Stack.Screen name="signup" component={Signup} />
                            <Stack.Screen name="themeselect" component={ThemeSelect} />
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
