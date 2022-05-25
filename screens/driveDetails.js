import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Alert, TextInput} from 'react-native';
const volunteerApi = require("../helpers/volunteerApi.js");
import { styles } from '../styles/driveStyles';

const driveDetails = ({navigation, route})  =>{
    const drive = route.params.drive;
    console.log("Drive ", drive);
    const acceptDrive = async()=>{
        const res = await volunteerApi.acceptDrive(drive._id);
        return res;
    }
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
    async function onAccept(){
        Alert.alert(
          "Drive",
          "Do you want to accept this drive?",
          [
            {
              text:"Yes",
              onPress: () => {
                acceptDrive()
                .then((response)=>{
                    alert(response.message);
                    navigation.navigate("dashboard", {driveDataChanged: !route.params.driveDataChanged});
                })
                .catch((e)=>{
                    console.log(e);
                });
                
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



    return (
        <SafeAreaView>
            <View style={styles.heading}>
                <Text style={styles.headingText}>Details of the Drive</Text>
            </View>
            <Text style={styles.pickupText}>Drive#: KHI12345678</Text>
            <View style={styles.line}></View>
            <View style={styles.container}>
                <View style={styles.item}><Text style={styles.column1Text}>Location:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? drive.driveLocation  : '*loading*'}</Text></View>

                <View style={styles.item}><Text style={styles.column1Text}>Date:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? (new Date(drive.date)).toUTCString().substring(0, 17)  : '*loading*'}</Text></View> 

                <View style={styles.item}><Text style={styles.column1Text}>Time:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? convertTime(drive.date)  : '*loading*'}</Text></View> 

                <View style={styles.item}><Text style={styles.column1Text}>Duration:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? drive.duration  : '*loading*'}</Text></View>  

                <View style={styles.item}><Text style={styles.column1Text}>Meetup Point:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? drive.meetupPoint  : '*loading*'}</Text></View>            

                <View style={styles.item}><Text style={styles.column1Text}>Meetup Time:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? drive.meetupTime  : '*loading*'}</Text></View> 

                <View style={styles.item}><Text style={styles.column1Text}>Will be leaving at:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? drive.departureTime  : '*loading*'}</Text></View> 

                <View style={styles.item}><Text style={styles.column1Text}>Volunteer Cateory:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? drive.volunteerCategory  : '*loading*'}</Text></View> 

                <View style={styles.item}><Text style={styles.column1Text}>Estimated volunteers:</Text></View>
                <View style={styles.item}><Text style={styles.value}>{drive? drive.maxCount  : '*loading*'}</Text></View> 
            </View>
            <View><Text style={styles.description}>Description/guidelines:</Text></View>
            <View>
                <TextInput
                    multiline={true}
                    numberOfLines={2}
                    value={drive? drive.description  : '*loading*'}
                    editable={false} 
                    selectTextOnFocus={false}
                    style={styles.textArea}
                />
                
                <View style={styles.container}>
                    <View >
                        <TouchableOpacity style={styles.button} onPress={()=>onAccept()}>
                            <Text style={styles.buttonText}>Join Drive</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default driveDetails;
