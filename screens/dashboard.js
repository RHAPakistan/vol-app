import React, { useContext } from "react";
import { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, PermissionsAndroid,SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import { styles } from "./styles";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./home";
import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Geolocation from 'react-native-geolocation-service';
import PickupList from '../components/PickupList/';
const volunteerApi = require("../helpers/volunteerApi.js");
import { SocketContext} from "../context/socket";

export default function Dashboard({navigation}) {
  const socket = useContext(SocketContext);
  const [data, setData] = useState([]);

  useEffect(()=>{
    //get all pickups with status code 1
    console.log("dashboard screen mounted");
		const fetchData = async()=>{
			const resp = await volunteerApi.get_pickups_by_vol_id();
      // console.log("The pickups are ",resp.pickups);
			return resp.pickups;
		}
		fetchData()
		.then((response)=>{
			setData(response);
		})
		.catch((e)=>{
			console.log(e);
		})		

    //listen for any newly broadcasted or unicasted pickups
    socket.on("assignPickup", (sock_data)=>{
      console.log("Received assignPickup message")
      data.push(sock_data.message);
      setData(data);
    })
    return ()=>{
      console.log("turning off socket on assignPickup ");
      socket.off("assignPickup");
    }
  },[])
  async function onClick(id){
    Alert.alert(
      "Pickup",
      "Do you want to accept this pickup?",
      [
        {
          text:"Yes",
          onPress: () => {
            console.log("pickup accepted");
            //change the status to 2 (accepted)
            id.status = 2
            socket.emit("acceptPickup",{"message":id})
            navigation.navigate("secondstep", {id});
          }
        },
        {
          text:"No",
          onPress: () => {console.log("Ok pressed")},
          style:"Cancel"
        }
      ]
    )

  }
  function onClickContact(){
    navigation.navigate('contact')
  }
  return ( 
    <SafeAreaView style={styles.containerDashboard}>

      <PickupList data={data} onPress = {onClick}/>

    </SafeAreaView>
         );
    }