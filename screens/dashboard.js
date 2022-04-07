import React, { useContext } from "react";
import { Component, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Modal, Image, Button, PermissionsAndroid, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { StackActions } from "@react-navigation/native";
const volunteerApi = require("../helpers/volunteerApi.js");
import { SocketContext } from "../context/socket";
import PickupModal from "../components/Notifications/pickupModal";
import PickupCard from "../components/Notifications/pickupCard";
import Drives from "../components/Drives";
import localStorage from "../helpers/localStorage";
import * as auth from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';
// import Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
// require('firebase/app/auth');
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyAW_w_lvd2oMJ9hYM_lQWR4db6cr7ksg",
  authDomain: "rhafoodapp.firebaseapp.com",
  databaseURL: "https://rhafoodapp-default-rtdb.firebaseio.com",
  projectId: "rhafoodapp",
  storageBucket: "rhafoodapp.appspot.com",
  messagingSenderId: "621468312534",
  appId: "1:621468312534:web:bb0d94aee0ec51bfeafa77",
  measurementId: "G-ZB0MB3MLBC"
};

// Initialize FirebaseinitializeApp(firebaseConfig);
initializeApp(firebaseConfig);

export default function Dashboard({ navigation, route }) {
  const socket = useContext(SocketContext);
  const [data, setData] = useState([]);
  const [drives, setDrives] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [vol_id, setVolid] = useState("");
  const [popPickup, setPopPickup] = useState({
    "_id": 1,
    "pickupAdress": "iba karachi",
    "deliveryAddress": "iba city",
    "description": "Please pickup the food on time"
  });

  const registerForPushNotifications =  async()=>{
    const {status} = await Notifications.getPermissionsAsync();;
    let finalStatus = status;

    //if no existing permission, ask user for permission.
    if (status!== 'granted'){
      const {status} =  await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    //if no permission exit the function
    if(finalStatus!=='granted'){return;}

    // //Get push notification token
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    
    //Add token to firebase
    console.log(token);
    const db = getDatabase();
    let uid = await localStorage.getData("volunteer_id");
    const reference = ref(db, "users"+uid);
    set(reference, {
      expoPushToken: token
    })
    volunteerApi.send_push_token(uid,token); 

  }

  useEffect(() => {
    //get all pickups with status code 1
    // console.log("dashboard screen mounted");
    // const fetchData = async () => {
    //   const resp = await volunteerApi.get_pickups_by_vol_id();
    //   // console.log("The pickups are ",resp.pickups);
    //   const volunteer_id = await localStorage.getData("volunteer_id");
    //   console.log(volunteer_id);
    //   return [volunteer_id, resp.pickups];
    // }
    // fetchData()
    //   .then((response) => {
    //     var [volunteer_id, pickups] = response;
    //     setData(pickups);
    //     setVolid(volunteer_id);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   })
    registerForPushNotifications()
    .then((response)=>{
      console.log(response);
    })
    .catch((e)=>{
      console.log(e);
    })
    const fetchDrives = async () => {
      const resp = await volunteerApi.getDrives();
      return resp.drives;
    }
    fetchDrives()
      .then((response) => {
        console.log(response);
        setDrives(response);
      })
      .catch((e) => {
        console.log(e);
      })

    //listen for any newly broadcasted or unicasted pickups

  //   console.log("Listening for assign Pickup at dashboard:35");
  //   socket.on("assignPickup", (sock_data) => {
  //     console.log("Received assignPickup message")
  //     data.push(sock_data.message);
  //     setData(data);
  //   })

  //   socket.on("assignPickupSpecific", (sock_data) => {
  //     console.log("Received specific pickup", sock_data.message);
  //     setPopPickup(sock_data.message);
  //     setModalVisible(!modalVisible);
  //   })

  //   socket.on("informCancelPickup", (socket_data)=>{
  //     console.log("Pickup cancelled here", socket_data.pickup);
  //     fetchData()
  //     .then((response) => {
  //       var [volunteer_id, pickups] = response;
  //       setData(pickups);
  //       setVolid(volunteer_id);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  // })
  }, [route.params.driveDataChanged])

	useEffect(() => {

		const onMount = navigation.addListener('focus', () => {
			// The screen is focused
			// Call any action and update data
      console.log("dashboard screen mounted");
      const fetchData = async () => {
        const resp = await volunteerApi.get_pickups_by_vol_id();
        // console.log("The pickups are ",resp.pickups);
        const volunteer_id = await localStorage.getData("volunteer_id");
        console.log(volunteer_id);
        return [volunteer_id, resp.pickups];
      }
      fetchData()
        .then((response) => {
          var [volunteer_id, pickups] = response;
          setData(pickups);
          setVolid(volunteer_id);
        })
        .catch((e) => {
          console.log(e);
        })
        console.log("Listening for assign Pickup at dashboard:35");
        socket.on("assignPickup", (sock_data) => {
          console.log("Received assignPickup message");
          setData((prevState)=>{
            var pic = [...prevState];
            pic.push(sock_data.message);
            return pic;
          });
        })
    
        socket.on("assignPickupSpecific", (sock_data) => {
          console.log("Received specific pickup", sock_data.message);
          setPopPickup(sock_data.message);
          setModalVisible(!modalVisible);
        })
    
        socket.on("informCancelPickup", (socket_data)=>{
          console.log("Pickup cancelled here", socket_data.pickup);
          //incase modal is on then turn it off, cuz the pickup is no more.
          setModalVisible(false);
          fetchData()
          .then((response) => {
            var [volunteer_id, pickups] = response;
            setData(pickups);
            setVolid(volunteer_id);
          })
          .catch((e) => {
            console.log(e);
          })
      })

      socket.on("informCancelVolunteer",(socket_data)=>{
        console.log(`pickup cancelled by ${socket_data.role}`);
        fetchData()
        .then((response) => {
          var [volunteer_id, pickups] = response;
          setData(pickups);
          setVolid(volunteer_id);
        })
        .catch((e) => {
          console.log(e);
        })
      })
		});

		const onUnmount = navigation.addListener('blur', ()=>{
      console.log("turning off socket: assignPickup | assignPickupSpecific | informCancelPickup");
      socket.off("assignPickup");
      socket.off("assignPickupSpecific");
      socket.off("informCancelPickup");
      socket.off("informCancelVolunteer");
		});
		const unsub = () => {
			console.log("remove all listeners");
			onMount();
			onUnmount();

		}
		// Return the function to unsubscribe from the event so it gets removed on unmount
		return () => unsub();
	}, [navigation])

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
            id.volunteer = vol_id;
            console.log(id);
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

  const onClickDrive = (drive) =>{
    navigation.navigate("driveDetails", {drive, driveDataChanged: route.params.driveDataChanged})
  }
  return (
    <SafeAreaView style={styles.containerDashboard}>

      <Text style={styles.heading} >Pickups</Text>
      <View style={styles.lineStyle} />
      <PickupModal modalVisible={modalVisible} setModalVisible={setModalVisible}
        pickup={popPickup} onClickPickup={onClick} onClickReject={onClickReject} />

      {/* get pickups */}
      {data.length != 0 ? data.map((item) => (
        <PickupCard key={item._id} pickup={item} onClickPickup={() => { onClick(item) }} onClickReject={onClickReject} reject={true} />
      ))
        :
        <Text style={styles.bodyText}>No pickups yet</Text>}
      <View style={styles.lineStyle} />
      <Drives drives={drives} onClickDrive={onClickDrive}></Drives>
    </SafeAreaView>
  );
}