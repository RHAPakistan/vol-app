import React, { useContext, useEffect } from "react";
import { View, SafeAreaView} from 'react-native';
import { ScrollView} from "react-native-gesture-handler";
import PickupDetails from "../components/DetailsForm/PickupDetails"
import ActionBox from "../components/ActionBox/";
import ProgressBar from "../components/ProgressBar";
import {SocketContext} from "../context/socket";

function ThirdStep({navigation, route}) {

    const socket = useContext(SocketContext);
    const pickup = route.params.pickup;

    const cancelPickUp = () =>{
        navigation.navigate("dashboard");
    }   
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
    const proceed = ()=>{
        //completed pickup
        //emit food delivered -> finishPickup
        //change status to 3 (completed)
        pickup.status = 3
        socket.emit("finishPickup", {"message":pickup});
        navigation.navigate("finalstep", {pickup});
        
    }
    return ( 
        <ScrollView>
            <SafeAreaView>
            <ProgressBar active={2} message="The food has been picked" />
            <View style={{flex:1}}>
            <PickupDetails data={data}/>
            <ActionBox
					type='primary'
					title='Food Delivered'
					action={proceed}
				/>
            <ActionBox
					type='cancel'
					title='Cancel Pickup'
					action={cancelPickUp}
				/>    
            <ActionBox
					type='primary'
					title='Go ahead'
					action={()=>{navigation.navigate("finalstep")}}
				/>               
            </View> 
        </SafeAreaView>
        </ScrollView>
     );
}

export default ThirdStep;