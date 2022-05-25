import React from "react";
import { Alert, Modal} from "react-native";
import PickupCard from "./pickupCard";

const PickupModal = ({modalVisible, setModalVisible, pickup, onClickPickup, onClickReject}) => {

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
      <PickupCard pickup={pickup} onClickPickup={() => {onClickPickup(pickup)}}
      onClickReject={onClickReject}/>
      </Modal>
    );
}

export default PickupModal;