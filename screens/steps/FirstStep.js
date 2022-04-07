import React, { useContext, useEffect } from "react";
import { Alert,StyleSheet, Text, View, Image, Button, Icon, SafeAreaView, TouchableOpacity, Picker } from 'react-native';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles } from "../styles";
import ModalDropdown from "react-native-modal-dropdown";
import { socket } from "../../context/socket";
import PickupDetails from "../../components/DetailsForm/PickupDetails"
import ActionBox from "../../components/ActionBox";
import ProgressBar from "../../components/ProgressBar";
import { SocketContext } from "../../context/socket";
import GlobalStyles from "../../styles/GlobalStyles";

const volunteerApi = require("../../helpers/volunteerApi");


function FirstStep({ navigation, route }) {

    const socket = useContext(SocketContext);
    const [pickup, setPickup] = React.useState(route.params.id);
    const [text, onChangeText] = React.useState("name");
    const [phone, onChangePhone] = React.useState("phone");
    const [displayText, setDisplayText] = React.useState(text);
    const [displayPhone, setDisplayPhone] = React.useState(text);
    const [editClicked, setEdit] = React.useState('false');
    const [selectedValue, setSelectedValue] = React.useState("biryani");
    const [descriptionText, setDescription] = React.useState("Add description");
    const [locationLink, setLocation] = React.useState("paste maps link here or enter address");
    const [requestPlaced, setRequestPlaced] = React.useState('false');
    const [progressCount, setProgressCount] = React.useState(1);
    const [heading, setHeading] = React.useState("This pickup is your responsibility now");
    const [title, setTitle] = React.useState("First Step");
    const [current_provider, setCurrentProvider] = React.useState({});

	useEffect(() => {

		const onMount = navigation.addListener('focus', () => {
			// The screen is focused
			// Call any action and update data
            const get_prov = async () => {
                var current_provider = await volunteerApi.get_provider(pickup.provider);
                console.log("RERERERERERE", pickup);
                var current_pickup = (await volunteerApi.get_my_pickups({_id:pickup._id})).pickups[0];
                console.log("==>}",current_pickup);    
                return [current_provider, current_pickup]
            }
            get_prov()
                .then((response) => {
                    const [current_provider, current_pickup] = response;
                    setCurrentProvider(current_provider);
                    setPickup(current_pickup);
                    console.log("dsadsadsadsadsada",current_pickup);
                    if(current_pickup.status>3){
                        setProgressCount(3);
                        setTitle("Finished");
                        setHeading("The food has been delivered or cancelled");
                    }
                    else if (current_pickup.status<=1){
                        setProgressCount(1)
                        setTitle("First Step");
                        setHeading("This pickup is your responsibility now");
                    }
                    else if (current_pickup.status==2){
                        setProgressCount(2);
                        setTitle("Second Step");
                        setHeading("The food has been picked");
                    }
                })
                .catch((e) => {
                    console.log(e);
                })
            socket.on("informCancelPickup", (socket_data) => {
                console.log("Pickup cancelled here", socket_data.pickup);
                Alert.alert(
                    `Pickup cancelled by ${socket_data.role}`,
                    "Abort the journey",
                    [
                        {
                            text:"Ok, go back to dashboard",
                            onPress: ()=>{navigation.navigate("dashboard")}
                        }   
                    ]
                )
            })
			console.log("turning ON sockets => informCancelPickup");
		});

		const onUnmount = navigation.addListener('blur', ()=>{
			console.log("turning off sockets => informCancelPickup");
            socket.off("informCancelPickup");
		});
		const unsub = () => {
			console.log("remove all listeners");
			onMount();
			onUnmount();

		}
		// Return the function to unsubscribe from the event so it gets removed on unmount
		return () => unsub();
	}, [navigation])

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
        DROPOFF_LOC: pickup.deliveryAddress,
        VOLUNTEER: pickup.volunteer ? pickup.volunteer : "broadcasted"
    };

    const cancelPickUp = () => {
        pickup.broadcast = true;
        pickup.status = 1;
        delete pickup.volunteer;
        socket.emit("cancelPickup", { pickup: pickup,status:2,role:"volunteer"});
        navigation.navigate("dashboard");
    }

    const foodPicked = () => {
        //emit message that food has been picked
        console.log("TJAAA", pickup);
        socket.emit("foodPicked", { "message": pickup });
        setProgressCount(2);
        setTitle("Second Step");
        setHeading("The food has been picked");
    }

    const foodDelivered = () => {
        //completed pickup
        //emit food delivered -> finishPickup
        //change status to 3 (completed)
        console.log("this was clicked!");
        pickup.status = 4
        socket.emit("finishPickup", { "message": pickup });
        setProgressCount(3);
        setTitle("Finished");
        setHeading("The food has been delivered");
    }
    const navigateDashboard = () => {
        navigation.navigate("dashboard");
    }

    const ButtonRender = (props) => {

        if (props.progressCount == 1) {
            return (
                <View>
                    <ActionBox
                        type='primary'
                        title='Food picked'
                        action={foodPicked}
                    />
                    <ActionBox
                        type='cancel'
                        title='Cancel Pickup'
                        action={cancelPickUp}
                    />
                </View>
            );
        }
        else if (props.progressCount == 2) {
            return <ActionBox
                type='primary'
                title='Food Delivered'
                action={foodDelivered}
            />
        }
        else if (props.progressCount == 3) {
            return <ActionBox
                type='primary'
                title='Go to Dashboard'
                action={navigateDashboard}
            />
        }
        else{
            return <ActionBox
                type='primary'
                title='Go to Dashboard'
                action={navigateDashboard}
            />
        }

        
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.containerDashboard} >
                <View style={GlobalStyles.screenTitle}>
                    <Text style={GlobalStyles.screenTitleText}>{title}</Text>
                </View>
                <ProgressBar active={progressCount} message={heading} />

                <View style={{ flex: 1 }}>
                    <PickupDetails data={data} />
                    <ButtonRender progressCount={progressCount} />

                </View>


            </SafeAreaView>
        </ScrollView>
    );
}

export default FirstStep;