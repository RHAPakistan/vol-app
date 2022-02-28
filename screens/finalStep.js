import React from "react";
import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
//import { styles } from "./styles";

import ProgressBar from "../components/ProgressBar";

function FinalStep({navigation, route}) {    
    const id = route.params.id;
 
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
    const buttonPressed = () =>{
        navigation.navigate("dashboard");
    } 
    
    return ( 
        <SafeAreaView>
            <ScrollView>
            <ProgressBar active={3} message="The food has been delivered" />
                <View style={styles.main}>
                    <Text style={styles.thankText}>Thank You!</Text>
                    <Text style={styles.message}>John Doe, we appreciate you for giving your precious time to deliver the food.</Text>
                    <TouchableOpacity style={styles.button} onPress={buttonPressed}>
                        <Text style={styles.buttonText}>Go to Dashboard</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    containerDashboard: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop:50,
        paddingLeft: 15,
        paddingRight: 15
      },
    header:{
        margin: '2%',
        paddingTop: '5%',
        alignItems: 'center',
        alignContent: 'center'
    },
    headerText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#155F30'
    },
    line:{
        paddingTop: '1%',
        marginLeft: '1%',
        maxWidth: '98%',
        borderBottomColor: '#155F30',
        borderBottomWidth: 1.5,
    },
    main:{
        margin: '12%',
        alignItems: 'center',
        alignContent: 'center'
    },
    thankText:{
        marginTop: '3%',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#155F30',
    },
    message:{
        marginTop: '3%',
        fontSize: 16,
        color: '#39bf6a',
    },
    button: {
        marginTop: '3%',
        width: 240,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#155F30',
        marginTop: '5%',

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});
export default FinalStep;