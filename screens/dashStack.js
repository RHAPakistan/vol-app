import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "./dashboard";
import Contact from "./contact";
import PrimaryHeader from "../components/ScreenHeaders/PrimaryHeader";
import FirstStep from "./steps/FirstStep";
import driveDetails from './driveDetails';

export default function DashStack({ navigation }) {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator >
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        initialParams={{ driveDataChanged: false }}
        options={({ navigation }) => {
          return PrimaryHeader(navigation, "Dashboard");
        }}
      />
      <Stack.Screen
        name="firststep"
        component={FirstStep}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="contact"
        component={Contact}
      />
      <Stack.Screen 
          name= "driveDetails"
          component={driveDetails}
      />
    </Stack.Navigator>
  );
}