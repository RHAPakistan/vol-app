import React from "react";
import { Component } from "react";
import { StyleSheet, Text, View, Image, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import { styles } from "./styles";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./home";
import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "./dashboard";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";
import Contact from "./contact";
import PrimaryHeader from "../components/ScreenHeaders/PrimaryHeader";
import FirstStep from "./steps/FirstStep";
import Drive from './driveDetails';

export default function DashStack({navigation}) {
 
  const Stack = createNativeStackNavigator();
  
  function onClick(){
  }
  return ( 
          <Stack.Navigator >
              <Stack.Screen
                  name="dashboard"
                  component={Dashboard}
                  options={({ navigation }) => {
                    return PrimaryHeader(navigation, "Dashboard");
                  }}
              />
              <Stack.Screen 
                  name = "firststep"
                  component = {FirstStep}
                  options={{headerShown:false}}
              />
              <Stack.Screen
                name = "secondstep"
                component = {SecondStep}
                options={{headerShown:false}}
                />
              <Stack.Screen
                name = "thirdstep"
                component = {ThirdStep}
                options={{headerShown:false}}
                />
            <Stack.Screen
                name = "contact"
                component = {Contact}
                />
            <Stack.Screen 
                    name= "driveDetails"
                    component={Drive}
                />
          </Stack.Navigator>
         );
    }