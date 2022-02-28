import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Alert, ScrollView} from 'react-native';
const volunteerApi = require("../helpers/volunteerApi.js");
import { styles } from '../styles/dashboardStyles';
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
    console.log("Listening for assign Pickup at dashboard:35");
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
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.requestText}>Active Pickup Requests</Text>
      <ScrollView style={styles.requestScrollView}>
          {console.log(data)}
          {data? 
              data.map(pickup => (
              <View style={styles.requestCard}  key={pickup._id}>
                  <Text style={styles.requestHeader}>Pickup Loaction:</Text>
                  <Text style={styles.detailsText}>{pickup.pickupAddress}</Text>
                  <Text style={[styles.requestHeader, {marginTop: '3%'}]}>Dropoff Loaction:</Text>
                  <Text style={styles.detailsText}>{pickup.deliveryAddress}</Text>
                  <Text style={[styles.requestHeader, {marginTop: '3%'}]}>Food Details:</Text>
                  <Text style={styles.detailsText}>{pickup.description}</Text>
                  <TouchableOpacity style={styles.button} onPress={onClick}>
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
          <Text style={styles.nullText}>No Drives as of Yet.</Text>
      </ScrollView>
      <View style={styles.footer}>
          <Text>Footer here</Text>
      </View>            
    </SafeAreaView>

  );
}
