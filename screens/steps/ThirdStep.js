import React from "react";
import { StyleSheet, Text, View, Image, Button, Icon,SafeAreaView, TouchableOpacity, Picker} from 'react-native';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles } from "../styles";
import ModalDropdown from "react-native-modal-dropdown";
import PickupDetails from "../../components/DetailsForm/PickupDetails"
import ActionBox from "../../components/ActionBox";
import ProgressBar from "../../components/ProgressBar";
import GlobalStyles from "../../styles/GlobalStyles";

function ThirdStep({navigation, route}) {    
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

    const navigateDashboard = () =>{
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
    return ( 
        <ScrollView>
        <SafeAreaView style={styles.containerDashboard}>
            <View style={GlobalStyles.screenTitle}>
                <Text style={GlobalStyles.screenTitleText}>Finished</Text>
            </View>
        <ProgressBar active={3} message="The food has been delivered" />
            <PickupDetails data={data}/>
        </SafeAreaView>
        <ActionBox
					type='primary'
					title='Go to Dashboard'
					action={navigateDashboard}
				/>
        </ScrollView>
     );
}

export default ThirdStep;