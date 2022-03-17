import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Icon,SafeAreaView, TouchableOpacity, Picker} from 'react-native';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles } from "../styles";
import ModalDropdown from "react-native-modal-dropdown";
import { socket } from "../../context/socket";
import PickupDetails from "../../components/DetailsForm/PickupDetails"
import ActionBox from "../../components/ActionBox";
import ProgressBar from "../../components/ProgressBar";
import {SocketContext} from "../../context/socket";
import GlobalStyles from "../../styles/GlobalStyles";

function SecondStep({navigation, route}) {

    const socket = useContext(SocketContext);
    const pickup = route.params.pickup;
    const current_provider = route.params.current_provider;
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
    const proceed = ()=>{
        //completed pickup
        //emit food delivered -> finishPickup
        //change status to 3 (completed)
        console.log("this was clicked!");
        pickup.status = 3
        socket.emit("finishPickup", {"message":pickup});
        navigation.navigate("thirdstep", {pickup, current_provider});
        
    }
    return ( 
        <ScrollView>
            <SafeAreaView style={styles.containerDashboard}>
            <View style={GlobalStyles.screenTitle}>
                <Text style={GlobalStyles.screenTitleText}>Second Step</Text>
            </View>
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
            {/* <ActionBox
					type='primary'
					title='Go ahead'
					action={()=>{navigation.navigate("thirdstep")}}
				/>                */}
            </View> 
        </SafeAreaView>
        </ScrollView>
     );
}

export default SecondStep;