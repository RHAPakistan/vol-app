import React from "react";
import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
//import { styles } from "./styles";
import Appreciation from "../components/Appreciation";
import ProgressBar from "../components/ProgressBar";

function FinalStep({navigation, route}) {    
    const pickup = route.params.pickup;
 
    const data = {
		BOOKING_TIME: pickup.placementTime,
		// COMPLETION_TIME: '{COMPLETION_TIME}',
		// CANCELLATION_TIME: '{CANCELLATION_TIME}',
		CONTACT_NAME: pickup._id,
		CONTACT_PHONE: pickup.provieder_phone,
		PROVIDER: {
			type: 'Registered',
			name: "",
			action: () => console.log('Provider Button Pressed'),
		},
		PICKUP_LOCATION: () => console.log(pickup.pickupAddress),
		SURPLUS_TYPE: pickup.typeOfFood,
		DESCRIPTION:
			pickup.description,
		DROPOFF_LOC: "anyone",
		VOLUNTEER: "anything"
	};
    const buttonPressed = () =>{
        navigation.navigate("dashboard");
    } 
    
    return ( 
        <SafeAreaView>
            <ScrollView>
            <ProgressBar active={3} message="The food has been delivered" />
                <Appreciation name="John Doe" buttonPressed={buttonPressed}></Appreciation>
            </ScrollView>
        </SafeAreaView>
     );
}

export default FinalStep;