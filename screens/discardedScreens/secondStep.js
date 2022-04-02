import React, { useContext } from "react";
import { View, SafeAreaView } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./styles";
import PickupDetails from "../components/DetailsForm/PickupDetails"
import ActionBox from "../components/ActionBox/";
import ProgressBar from "../components/ProgressBar";
import {SocketContext} from "../context/socket";

function SecondStep({ navigation, route }) {

    const socket = useContext(SocketContext);
    const pickup = route.params.pickup;
    const [text, onChangeText] = React.useState("name");

    const cancelPickUp = () => {
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
    const proceed = () => {
        //emit message that food has been picked
        socket.emit("foodPicked", {"message":pickup});
        navigation.navigate("thirdstep", { pickup });
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