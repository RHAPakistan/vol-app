import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { styles } from '../styles/AppreciationStyles';
export default Appreciation = ({name, buttonPressed})=>{
    return(
        <View style={styles.main}>
            <Text style={styles.thankText}>Thank You!</Text>
            <Text style={styles.message}>{name}, we appreciate you for giving your precious time to deliver the food.</Text>
            <TouchableOpacity style={styles.button} onPress={buttonPressed}>
                <Text style={styles.buttonText}>Go to Dashboard</Text>
            </TouchableOpacity>
        </View>
    );
}