import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "./dashboard";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import FinalStep from "./finalStep";
import Contact from "./contact";
import Drive from "./driveDetails"


export default function DashStack({navigation}) {
 
  const Stack = createNativeStackNavigator();
  
  return ( 
          <Stack.Navigator >
                <Stack.Screen
                    name="dashboard"
                    component={Dashboard}
                    options={{ title: 'Dashboard'}, {headersShown: false}}
                />
                <Stack.Screen
                    name="firststep"
                    component={FirstStep}/>
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
                <Stack.Screen 
                    name= "driveDetails"
                    component={Drive}
                />
          </Stack.Navigator>
         );
    }