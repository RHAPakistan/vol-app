import React from "react";
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';

import { styles } from "../styles/dashboardStyles";

export default Pickups = ({pickups, onClickPickup}) =>{

    return (
        <View >
            <Text style={styles.requestText}>Active Pickup Requests</Text>
            <ScrollView style={styles.requestScrollView}>        
                {pickups? 
                    pickups.map(pickup => (
                    <View style={styles.requestCard}  key={pickup._id}>
    
                        <Text style={styles.requestHeader}>Pickup Loaction:</Text>
                        <Text style={styles.detailsText}>{pickup.pickupAddress}</Text>
    
                        <Text style={[styles.requestHeader, {marginTop: '3%'}]}>Dropoff Loaction:</Text>
                        <Text style={styles.detailsText}>{pickup.deliveryAddress}</Text>
    
                        <Text style={[styles.requestHeader, {marginTop: '3%'}]}>Food Details:</Text>
                        <Text style={styles.detailsText}>{pickup.description}</Text>
    
                        <TouchableOpacity style={styles.button} onPress={()=>onClickPickup(pickup)}>
                            <Text style={styles.buttonText}>Accept</Text>         
                        </TouchableOpacity>
                    </View>
                ))
                :
                <View><Text style={styles.nullText}>No pickup as of yet.</Text></View> 
                }
            </ScrollView>
        </View>
    );
}