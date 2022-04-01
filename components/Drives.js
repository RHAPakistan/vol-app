import React from "react";
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';

import { styles } from "../styles/dashboardStyles";

export default Drives = ({drives, onClickDrive}) =>{
    
    return (
<<<<<<< HEAD
        <View >
            <Text style={styles.requestText}>Drives Requests</Text>
            <View style={styles.lineStyle}/>
            <ScrollView style={styles.requestScrollView}>
                {drives.length!=0? 
=======
        <View style={styles.container}>
            <Text style={styles.requestText}>Drives Requests</Text>
            <ScrollView style={styles.requestScrollView}>
                {drives? 
>>>>>>> 99fdd024bb2c04a72dee658c8c9417d896b3bd08
                    drives.map(drive => (
                    <View style={styles.requestCard}  key={drive._id}>
                        <Text style={styles.requestHeader}>Drive Location/Area:</Text>
                        <Text style={styles.detailsText}>{drive.driveLocation}</Text>

                        <Text style={styles.requestHeader}>Date and Time:</Text>
                        <Text style={styles.detailsText}>{drive.date}</Text>
                        
                        <TouchableOpacity style={styles.button} onPress={()=>onClickDrive(drive)}>
                            <Text style={styles.buttonText}>See Details</Text>         
                        </TouchableOpacity>
                    </View>
                ))
                :
<<<<<<< HEAD
                <View><Text style={styles.nullText}>No drive as of yet.</Text>
                            <View style={styles.lineStyle}/></View> 
                
=======
                <View><Text style={styles.nullText}>No drive as of yet.</Text></View> 
>>>>>>> 99fdd024bb2c04a72dee658c8c9417d896b3bd08
                }
            </ScrollView>
        </View>
    );
}