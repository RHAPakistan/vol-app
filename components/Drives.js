import React from "react";
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';

import { styles } from "../styles/dashboardStyles";

export default Drives = ({drives, onClickDrive}) =>{
    
    const convertTime =(date)=>{
        let formatDate = new Date(date);
        let hrs = formatDate.getHours()
        let mins = formatDate.getMinutes()
        if(hrs<=9)
        hrs = '0' + hrs
        if(mins<10)
        mins = '0' + mins
        let postTime = ''
        if(hrs<12)
            postTime= hrs + ':' + mins + ' AM'
        else{
            hrs = hrs -12
            postTime= hrs + ':' + mins + ' PM'
        }
        return postTime
    }
    return (
        <View style={styles.container}>
            <Text style={styles.requestText}>Drives Requests</Text>
            <ScrollView style={styles.requestScrollView}>
                {drives? 
                    drives.map(drive => (
                    <View style={styles.requestCard}  key={drive._id}>
                        <View style={styles.row}>
                            <Text style={styles.requestHeader}>Title:</Text>
                            <Text style={styles.detailsText}>             {drive.title}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.requestHeader}>Location:</Text>
                            <Text style={styles.detailsText}>     {drive.driveLocation}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.requestHeader}>Date-Time:</Text>
                            <Text style={styles.detailsText}>  {(new Date(drive.date)).toUTCString().substring(0, 16)},  {convertTime(drive.date)}</Text>
                        </View>
                        
                        
                        <TouchableOpacity style={styles.button} onPress={()=>onClickDrive(drive)}>
                            <Text style={styles.buttonText}>See Details</Text>         
                        </TouchableOpacity>
                    </View>
                ))
                :
                <View><Text style={styles.nullText}>No drive as of yet.</Text></View> 
                }
            </ScrollView>
        </View>
    );
}