import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import styles from "./styles";
import PickupCard from "./pickupCard";

const PickupModal = ({modalVisible, setModalVisible, pickup, onClickPickup}) => {

    return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
      <PickupCard pickup={pickup} onClickPickup={() => {onClickPickup(pickup)}}/>
      </Modal>
    );
}

export default PickupModal;