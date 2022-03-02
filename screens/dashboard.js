import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Alert, ScrollView} from 'react-native';
const volunteerApi = require("../helpers/volunteerApi.js");
import { styles } from '../styles/dashboardStyles';
import { SocketContext} from "../context/socket";

export default function Dashboard({navigation}) {
  const socket = useContext(SocketContext);
  const [pickups, setPickups] = useState([]);
  const [drives, setDrives] = useState([]);

  useEffect(()=>{
    //get all pickups with status code 1
    console.log("dashboard screen mounted");

		const fetchPickups = async()=>{
			const resp = await volunteerApi.get_pickups_by_vol_id();
			return resp.pickups;
		}
		fetchPickups()
		.then((response)=>{
			setPickups(response);
		})
		.catch((e)=>{
			console.log(e);
		});
    
    const fetchDrives = async()=>{
			const resp = await volunteerApi.getDrives();
			return resp.drives;
		}
		fetchDrives()
		.then((response)=>{
      console.log(response);
			setDrives(response);
		})
		.catch((e)=>{
			console.log(e);
		})

    //listen for any newly broadcasted or unicasted pickups
    console.log("Listening for assign Pickup at dashboard:35");
    socket.on("assignPickup", (sock_data)=>{
      console.log("Received assignPickup message")
      pickups.push(sock_data.message);
      setPickups(pickups);
    })
    return ()=>{
      console.log("turning off socket on assignPickup ");
      socket.off("assignPickup");
    }
  },[])
  async function onClickPickup(id){
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
  const onClickDrive = () =>{
    console.log("drive clicked");
  }
  function onClickContact(){
    navigation.navigate('contact')
  }
  return ( 
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.requestText}>Active Pickup Requests</Text>
      <ScrollView style={styles.requestScrollView}>        
          {console.log(pickups)}
          {pickups? 
              pickups.map(pickup => (
              <View style={styles.requestCard}  key={pickup._id}>

                  <Text style={styles.requestHeader}>Pickup Loaction:</Text>
                  <Text style={styles.detailsText}>{pickup.pickupAddress}</Text>

                  <Text style={[styles.requestHeader, {marginTop: '3%'}]}>Dropoff Loaction:</Text>
                  <Text style={styles.detailsText}>{pickup.deliveryAddress}</Text>

                  <Text style={[styles.requestHeader, {marginTop: '3%'}]}>Food Details:</Text>
                  <Text style={styles.detailsText}>{pickup.description}</Text>

                  <TouchableOpacity style={styles.button} onPress={onClickPickup}>
                      <Text style={styles.buttonText}>Accept</Text>         
                  </TouchableOpacity>
              </View>
          ))
          :
          <View><Text style={styles.nullText}>No pickup as of yet.</Text></View> 
          }
      </ScrollView>
      <Text style={styles.requestText}>Drives Requests</Text>
      <ScrollView style={styles.requestScrollView}>
        {console.log(drives)}
          {drives? 
              drives.map(drive => (
              <View style={styles.requestCard}  key={drive._id}>

                  <Text style={styles.requestHeader}>Drive Location/Area:</Text>
                  <Text style={styles.detailsText}>{drive.driveLocation}</Text>

                  <Text style={styles.requestHeader}>Date and Time:</Text>
                  <Text style={styles.detailsText}>{drive.date}</Text>
                  
                  <TouchableOpacity style={styles.button} onPress={onClickDrive}>
                      <Text style={styles.buttonText}>See Details</Text>         
                  </TouchableOpacity>
              </View>
          ))
          :
          <View><Text style={styles.nullText}>No drive as of yet.</Text></View> 
        }
      </ScrollView>
      <View style={styles.footer}>
          <Text>Footer here</Text>
      </View>            
    </SafeAreaView>

  );
}
