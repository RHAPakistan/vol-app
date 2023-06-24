import React, {useContext} from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import styles from './styles';
import {SocketContext} from "../../context/socket";

const PickupCard = ({pickup, onClickPickup, onClickReject, reject}) => {
    
    const socket = useContext(SocketContext);
    const openMaps = () =>{
        if(pickup.pickupCoordinate){
            const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
            const latLng = `${pickup.pickupCoordinate.coordinates[1]},${pickup.pickupCoordinate.coordinates[0]}`;
            const label = 'Custom Label';
            const url = Platform.OS === 'ios' ? `${scheme}${label}@${latLng}` : `${scheme}${latLng}(${label})`
            Linking.openURL(url);
        }
        else{
            alert("No Location Assigned")
        }
    }
    const rejectButton = ()=>{
        if(!reject){
            return(
            <TouchableOpacity style={styles.button} onPress={onClickReject}>
            <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>    
            )
        }
    }
    return (
        <View style={styles.modalView} key={pickup._id}>
            <Text style={styles.requestHeader}>Pickup Loaction:</Text>
            <Text style={styles.detailsText}>{pickup.pickupAddress}</Text>
            <TouchableOpacity onPress={openMaps} style={styles.mapsButton}>
                <Text style={styles.mapsButtonText}>Open in Maps</Text>
            </TouchableOpacity>
            <Text style={[styles.requestHeader, { marginTop: '3%' }]}>Dropoff Loaction:</Text>
            <Text style={styles.detailsText}>{pickup.deliveryAddress}</Text>
            
            <Text style={[styles.requestHeader, { marginTop: '3%' }]}>Food Details:</Text>
            <Text style={styles.detailsText}>{pickup.description}</Text>

            <TouchableOpacity style={styles.button} onPress={onClickPickup}>
                <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            
            {rejectButton()}
        </View>
    );
}
export default PickupCard;