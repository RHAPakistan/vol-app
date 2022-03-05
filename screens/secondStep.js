import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Icon, SafeAreaView, TouchableOpacity, Picker } from 'react-native';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles } from "./styles";
import ModalDropdown from "react-native-modal-dropdown";
import { socket } from "../context/socket";
import PickupDetails from "../components/DetailsForm/PickupDetails"
import ActionBox from "../components/ActionBox";
import ProgressBar from "../components/ProgressBar";
import {SocketContext} from "../context/socket";
const volunteerApi = require("../helpers/volunteerApi");

function SecondStep({ navigation, route }) {

    const socket = useContext(SocketContext);
    const pickup = route.params.id;
    const [text, onChangeText] = React.useState("name");
    const [phone, onChangePhone] = React.useState("phone");
    const [displayText, setDisplayText] = React.useState(text);
    const [displayPhone, setDisplayPhone] = React.useState(text);
    const [editClicked, setEdit] = React.useState('false');
    const [selectedValue, setSelectedValue] = React.useState("biryani");
    const [descriptionText, setDescription] = React.useState("Add description");
    const [locationLink, setLocation] = React.useState("paste maps link here or enter address");
    const [requestPlaced, setRequestPlaced] = React.useState('false');
    const [current_provider, setCurrentProvider] = React.useState({});

	useEffect(()=>{
		const get_prov = async()=>{
			var current_provider = await volunteerApi.get_provider(pickup.provider);
			return current_provider
		}
		get_prov()
		.then((response)=>{
			setCurrentProvider(response);
		})
		.catch((e)=>{
			console.log(e);
		})
	},[])
    
    const cancelPickUp = () => {
        navigation.navigate("dashboard");
    }
    const data = {
        BOOKING_TIME: pickup.placementTime,
        // COMPLETION_TIME: '{COMPLETION_TIME}',
        // CANCELLATION_TIME: '{CANCELLATION_TIME}',
        CONTACT_NAME: current_provider.fullName,
        CONTACT_PHONE: current_provider.contactNumber,
        PROVIDER: {
            type: 'Registered',
            name: current_provider.fullName,
            action: () => console.log('Provider Button Pressed'),
        },
        PICKUP_LOCATION: pickup.pickupAddress,
        SURPLUS_TYPE: pickup.typeOfFood,
        DESCRIPTION:
            pickup.description,
        DROPOFF_LOC: "anyone",
        VOLUNTEER: pickup.volunteer?pickup.volunteer:"broadcasted"
    };
    const proceed = () => {
        //emit message that food has been picked
        socket.emit("foodPicked", {"message":pickup});
        navigation.navigate("thirdstep", { pickup, current_provider});
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.containerDashboard}>

                <ProgressBar active={1} message="This pickup is your responsibility now" />

                <View style={{ flex: 1 }}>
                    <PickupDetails data={data} />
                    <ActionBox
                        type='primary'
                        title='Food picked'
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
                        action={() => { navigation.navigate("finalstep") }}
                    />
                </View>


            </SafeAreaView>
        </ScrollView>
    );
}

export default SecondStep;