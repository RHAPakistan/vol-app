import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Button, Icon,SafeAreaView, TouchableOpacity, Picker} from 'react-native';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles } from "./styles";
import ModalDropdown from "react-native-modal-dropdown";
import { NavigationContainer } from "@react-navigation/native";
import io from "socket.io-client";
import {SocketContext} from '../context/socket';
const providerApi = require("../helpers/volunteerApi.js");
import * as SecureStore from "expo-secure-store";
import {SOCKET_URL} from "../config.json";
import SecondStep from "./secondStep";
import PickupDetails from "../components/DetailsForm/PickupDetails"
import ActionBox from "../components/ActionBox/";

function FirstStep({navigation, route}) {

    const currentPickup = route.params.id;
    const socket = useContext(SocketContext);
    const [text, onChangeText] = React.useState("name");
    const [phone, onChangePhone] = React.useState("phone");
    const [displayText, setDisplayText] = React.useState(text);
    const [displayPhone, setDisplayPhone] = React.useState(text);
    const [editClicked, setEdit] = React.useState('false');
    const [selectedValue, setSelectedValue] = React.useState("biryani");
    const [descriptionText, setDescription] = React.useState("Add description");
    const [locationLink, setLocation] = React.useState("paste maps link here or enter address");
    const [amountOfFood, setAmountOfFood] = React.useState("Enter amount of food");    
    const [requestPlaced, setRequestPlaced] = React.useState('false');
    const [surplus, setSurplus] = React.useState("add surplus");


    const handleEdit = () =>{
        setEdit(!editClicked);
        console.log(editClicked);
        console.log("I was clicked");
    }
    const handleCancel = () =>{
        setDisplayText(displayText);
        setDisplayPhone(displayPhone);
        setEdit(!editClicked);
        onChangeText(displayText);
        onChangePhone(displayPhone);
    }

    const handleDone = () => {
        setDisplayText(text);
        setDisplayPhone(phone);
        setEdit(!editClicked);
    }

    const placePickUp = async () =>{
        setRequestPlaced(!requestPlaced);
        //const socket = io("http://localhost:5000");
        // console.log(socket)
        var provider_id = await SecureStore.getItemAsync("provider_id");
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        var pickup_object = {
            //"provider": provider_id,
            // "admin":"",
            // "volunteer":"",
            "pickupAddress": locationLink,
            "phone":phone,
            "description":descriptionText,
            // "deliveryAddress": "deliveryAddress",
            "placementTime":dateTime,
            // "acceptanceTime":"",
            // "pickUpTime":"",
            // "deliveryTime":"",
            "amountOfFood":amountOfFood,
            "typeOfFood":surplus,
            "status":0
        }
        var response = await providerApi.createPickup(pickup_object);
        console.log(response);
        if(response==true){
        navigation.navigate('secondstep');
        }else{
            alert("Pickup already exists or some information missing");
        }
        console.log("Listening for Request Accepted");
        //console.log(socket);
        socket.on("Request Accepted", (data) =>{
            navigation.navigate("thirdstep");
            socket.off("Request Accepted");
            console.log("Turned off listener for request accepted");
            socket.on("Food picked", (data)=>{
                navigation.navigate("finalstep");
                socket.off("Food picked");
                console.log("Turned off listener for food picked");
            })
        });

    }   
    const data = {
		BOOKING_TIME: currentPickup.placementTime,
		// COMPLETION_TIME: '{COMPLETION_TIME}',
		// CANCELLATION_TIME: '{CANCELLATION_TIME}',
		CONTACT_NAME: currentPickup._id,
		CONTACT_PHONE: currentPickup.provieder_phone,
		PROVIDER: {
			type: 'Registered',
			name: "",
			action: () => console.log('Provider Button Pressed'),
		},
		PICKUP_LOCATION: () => console.log(currentPickup.pickupAddress),
		SURPLUS_TYPE: currentPickup.typeOfFood,
		DESCRIPTION:
			currentPickup.description,
		DROPOFF_LOC: "anyone",
		VOLUNTEER: "anything"
	};
    const proceed = ()=>{
        navigation.navigate("thirdstep");
    }
    return ( 
        <ScrollView>
        <SafeAreaView style={styles.containerDashboard}>
            <PickupDetails data={data}/>
            <ActionBox
					type='primary'
					title='Proceed'
					action={proceed}
				/>
        </SafeAreaView>
        </ScrollView>
     );
}

export default FirstStep;