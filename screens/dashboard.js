import React, { useContext } from "react";
import { Component, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Modal, Image, Button, PermissionsAndroid, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Geolocation from 'react-native-geolocation-service';
import PickupList from '../components/PickupList/';
const volunteerApi = require("../helpers/volunteerApi.js");
import { SocketContext } from "../context/socket";
import PickupModal from "../components/Notifications/pickupModal";
import PickupCard from "../components/Notifications/pickupCard";

export default function Dashboard({ navigation }) {
  const socket = useContext(SocketContext);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [popPickup, setPopPickup] = useState({
    "_id": 1,
    "pickupAdress": "iba karachi",
    "deliveryAddress": "iba city",
    "description": "Please pickup the food on time"
  });

  useEffect(() => {
    //get all pickups with status code 1
    console.log("dashboard screen mounted");
    const fetchData = async () => {
      const resp = await volunteerApi.get_pickups_by_vol_id();
      // console.log("The pickups are ",resp.pickups);
      return resp.pickups;
    }
    fetchData()
      .then((response) => {
        setData(response);
      })
      .catch((e) => {
        console.log(e);
      })

    //listen for any newly broadcasted or unicasted pickups

    console.log("Listening for assign Pickup at dashboard:35");
    socket.on("assignPickup", (sock_data) => {
      console.log("Received assignPickup message")
      data.push(sock_data.message);
      setData(data);
    })

    socket.on("assignPickupSpecific", (sock_data) => {
      console.log("Received specific pickup", sock_data.message);
      setPopPickup(sock_data.message);
      setModalVisible(!modalVisible);
    })
    return () => {
      console.log("turning off socket on assignPickup ");
      socket.off("assignPickup");
      socket.off("assignPickupSpecific");
    }
  }, [])

  async function onClick(id) {
    Alert.alert(
      "Pickup",
      "Do you want to accept this pickup?",
      [
        {
          text: "Yes",
          onPress: () => {
            console.log("pickup accepted");
            //change the status to 2 (accepted)
            id.status = 2
            socket.emit("acceptPickup", { "message": id })
            navigation.navigate("firststep", { id });
          }
        },
        {
          text: "No",
          onPress: () => { console.log("Ok pressed") },
          style: "Cancel"
        }
      ]
    )

  }
  function onClickContact() {
    navigation.navigate('contact')
  }

  function onClickReject() {
    popPickup.broadcast = true
    delete popPickup.volunteer;
    socket.emit("broadcastPickup", { "message": popPickup });
    setModalVisible(!modalVisible);
  }
  return (
    <SafeAreaView style={styles.containerDashboard}>

      <Text style = {styles.heading} >Pickups</Text>
      <PickupModal modalVisible={modalVisible} setModalVisible={setModalVisible}
        pickup={popPickup} onClickPickup={onClick} onClickReject={onClickReject} />

      {/* get pickups */}
      {data.map((item) => (
        <PickupCard key = {item._id} pickup={item} onClickPickup={()=>{onClick(item)}} onClickReject={onClickReject} reject={true} />
      ))
      }

    </SafeAreaView>
  );
}