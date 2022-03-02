import React, {useContext} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import {SocketContext} from "../../context/socket";

const PickupCard = ({pickup, onClickPickup, onClickReject}) => {

    const socket = useContext(SocketContext);
    return (
        <View style={styles.modalView} key={pickup._id}>

            <Text style={styles.requestHeader}>Pickup Loaction:</Text>
            <Text style={styles.detailsText}>{pickup.pickupAddress}</Text>

            <Text style={[styles.requestHeader, { marginTop: '3%' }]}>Dropoff Loaction:</Text>
            <Text style={styles.detailsText}>{pickup.deliveryAddress}</Text>

            <Text style={[styles.requestHeader, { marginTop: '3%' }]}>Food Details:</Text>
            <Text style={styles.detailsText}>{pickup.description}</Text>

            <TouchableOpacity style={styles.button} onPress={onClickPickup}>
                <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClickReject}>
                <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
        </View>
    );
}
export default PickupCard;