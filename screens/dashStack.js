import React from "react";
import { Component } from "react";
import { StyleSheet, Text, View, Image, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import { styles } from "./styles";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./home";
import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "./dashboard";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import FinalStep from "./finalStep";
import Contact from "./contact";
import PrimaryHeader from "../components/ScreenHeaders/PrimaryHeader";

export default function DashStack({navigation}) {
 
  const Stack = createNativeStackNavigator();
  
  function onClick(){
  }
  return ( 
          <Stack.Navigator >
              <Stack.Screen
                  name="dashboard"
                  component={Dashboard}
                  options={{headerShown: false}}
              />
              <Stack.Screen 
                  name = "secondstep"
                  component = {SecondStep}
              />
              <Stack.Screen
                name = "thirdstep"
                component = {ThirdStep}
                />
              <Stack.Screen
                name = "finalstep"
                component = {FinalStep}
                />
            <Stack.Screen
                name = "contact"
                component = {Contact}
                />
          </Stack.Navigator>
         );
    }