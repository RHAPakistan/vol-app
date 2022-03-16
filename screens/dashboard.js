import React, { useContext, useState, useEffect  } from "react";
import { View, SafeAreaView, Alert} from 'react-native';
const volunteerApi = require("../helpers/volunteerApi.js");
import { styles } from '../styles/dashboardStyles';
import { SocketContext} from "../context/socket";
import Drives from "../components/Drives";
import Pickups from "../components/Pickups";


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


  async function onClickPickup(pickup){
    Alert.alert(
      "Pickup",
      "Do you want to accept this pickup?",
      [
        {
          text:"Yes",
          onPress: () => {
            console.log("pickup accepted");
            //change the status to 2 (accepted)
            pickup.status = 2
            socket.emit("acceptPickup",{"message":pickup})
            navigation.navigate("secondstep", {pickup});
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

  const onClickDrive = (drive) =>{
    navigation.navigate("driveDetails", {drive})
  }
  return ( 
    
    <SafeAreaView style={styles.container}>

      <Pickups pickups={pickups} onClickPickup={onClickPickup}></Pickups>
      <Drives drives={drives} onClickDrive={onClickDrive}></Drives>

      <View style={styles.footer}>
        
      </View>            
    </SafeAreaView>

  );
}