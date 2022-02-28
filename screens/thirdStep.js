import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Icon,SafeAreaView, TouchableOpacity, Picker} from 'react-native';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles } from "./styles";
import ModalDropdown from "react-native-modal-dropdown";
import { socket } from "../context/socket";
import PickupDetails from "../components/DetailsForm/PickupDetails"
import ActionBox from "../components/ActionBox/";
import ProgressBar from "../components/ProgressBar";
import {SocketContext} from "../context/socket";

function ThirdStep({navigation, route}) {

    const socket = useContext(SocketContext);
    const id = route.params.id;
    const [text, onChangeText] = React.useState("name");
    const [phone, onChangePhone] = React.useState("phone");
    const [displayText, setDisplayText] = React.useState(text);
    const [displayPhone, setDisplayPhone] = React.useState(text);
    const [editClicked, setEdit] = React.useState('false');
    const [selectedValue, setSelectedValue] = React.useState("biryani");
    const [descriptionText, setDescription] = React.useState("Add description");
    const [locationLink, setLocation] = React.useState("paste maps link here or enter address");
    const [requestPlaced, setRequestPlaced] = React.useState('false');

    const cancelPickUp = () =>{
        navigation.navigate("dashboard");
    }   
    const data = {
		BOOKING_TIME: id.placementTime,
		// COMPLETION_TIME: '{COMPLETION_TIME}',
		// CANCELLATION_TIME: '{CANCELLATION_TIME}',
		CONTACT_NAME: id._id,
		CONTACT_PHONE: id.provieder_phone,
		PROVIDER: {
			type: 'Registered',
			name: "",
			action: () => console.log('Provider Button Pressed'),
		},
		PICKUP_LOCATION: () => console.log(id.pickupAddress),
		SURPLUS_TYPE: id.typeOfFood,
		DESCRIPTION:
			id.description,
		DROPOFF_LOC: "anyone",
		VOLUNTEER: "anything"
	};
    const proceed = ()=>{
        //completed pickup
        //emit food delivered -> finishPickup
        //change status to 3 (completed)
        id.status = 3
        socket.emit("finishPickup", {"message":id});
        navigation.navigate("finalstep", {id});
        
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