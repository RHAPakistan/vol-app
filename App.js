import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import HomeScreen from './screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Drawer from './screens/drawer';
import LoginGuest from './components/LoginGuest';
import LoginUser from './components/LoginUser';
import LoginUser from './components/LoginUser';
import sendOTP from './components/ForgetPassword/sendOTP';
import confirmOTP from './components/ForgetPassword/confirmOTP';
import changePassword from './components/ForgetPassword/changePassword';
import signupUser from './screens/signupUser';
import { SocketContext, socket } from './context/socket';

const Stack = createNativeStackNavigator();

export default class App extends Component {

  render() {
    return (
      <SocketContext.Provider value={socket}>
        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen
              name="Drawer"
              component={Drawer}
              options={{ headerShown: false }} />
            <Stack.Screen
              name="signupUser"
              component={signupUser}
              options={{ title: 'Signup User', headerShown: false }}
            />
            <Stack.Screen
              name="Login user"
              component={LoginUser}
              options={{ headerShown: false }} />

            <Stack.Screen
              name="send_otp"
              component={sendOTP}
              options={{ headerShown: false }} />

            <Stack.Screen
              name="confirm_otp"
              component={confirmOTP}
              options={{ headerShown: false }} />

            <Stack.Screen
              name="change_password"
              component={changePassword}
              options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SocketContext.Provider>
    );
  }
}


