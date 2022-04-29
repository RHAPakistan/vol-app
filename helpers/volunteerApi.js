import { concat } from 'react-native-reanimated';
import { retrySymbolicateLogNow } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import {API_URL} from "../config.json";
import {initiateSocketConnection} from "../context/socket";
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
const localStorage = require("./localStorage");

module.exports = {
    //this funtion returns true if the user is valid else false
    //the funtion also adds the token to secure storage as "auth_token"
    signin: async (email, password) => {
        const resp = await fetch(API_URL.concat("/api/volunteer/login/"), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password
              })
        })
        .then((response) => {
            console.log(response.status);
            if (response.status=='200'){
                //navigation.navigate("Drawer");
                return response.json()
            }else{
                console.log("not authorized");
            }
            //return response.json()
        })
        .then(async (json) => {
            console.log("succesful network request");
            if (json){
                await localStorage.storeData('auth_token',json.token);
                await localStorage.storeData('volunteer_id',json._id);
                await localStorage.storeData('fullName', json.fullName);
                await localStorage.storeData('phone', json.contactNumber);
                initiateSocketConnection()
                if (Device.isDevice) {
                    const { status: existingStatus } = await Notifications.getPermissionsAsync();
                    let finalStatus = existingStatus;
                    if (existingStatus !== 'granted') {
                      const { status } = await Notifications.requestPermissionsAsync();
                      finalStatus = status;
                    }
                    if (finalStatus !== 'granted') {
                      alert('Failed to get push token for push notification!');
                      return;
                    }
                    const token = (await Notifications.getExpoPushTokenAsync()).data;
                    console.log(token);
                    // this.setState({ expoPushToken: token });
                    let uid = await localStorage.getData("volunteer_id");
                    module.exports.send_push_token(uid,token);
                  } else {
                    alert('Must use physical device for Push Notifications');
                  }
                
                  if (Platform.OS === 'android') {
                    Notifications.setNotificationChannelAsync('default', {
                      name: 'default',
                      importance: Notifications.AndroidImportance.MAX,
                      vibrationPattern: [0, 250, 250, 250],
                      lightColor: '#FF231F7C',
                    });
                  }
                return true
            }else{
                return false
            }
        })
        .catch((e) => {
            console.log(e);
            alert(e);
            console.log("error");
        });
        return resp
    },
    create_induction_request: async (value)=>{
        const resp = await fetch(API_URL.concat("/api/volunteer/placeInductionRequest"), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(value)
        })
        .then((response)=>{
            console.log("Induction response: ",response)
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
        return resp;
    },
    get_pickup_by_id: async(id)=>{
        const token = await localStorage.getData('auth_token');
        const resp = await fetch(API_URL.concat(`/api/volunteer/getPickups/${id}`),{
            method:"GET",
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Token " + token   
            }
        })
        .then((response)=>{
            console.log(response.json());
            return response.json();
        })
        .then((json)=>{
            return json;
        })
        .catch((e)=>{
            console.log(e);
            return e;
        })
        return resp;
        

    },
    get_pickups: async () =>{
        const token = await localStorage.getData('auth_token');
        const resp = await fetch(API_URL.concat("/api/volunteer/getPickups"), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Token " + token
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
    return resp;
    },
    get_provider: async(id) =>{
        const resp = await fetch(API_URL.concat(`/api/admin/provider/${id}`),{
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            return json
        })
        .catch((e)=>{
            console.log(e);
            console.log("error!");
        })
    return resp;
    },

    //this function returns either broadcasted pickups or the ones assigned
    //to the volunteer
    get_pickups_by_vol_id: async(query)=>{
        const token = await localStorage.getData('auth_token');
        const id = await localStorage.getData('volunteer_id');
        var query_string = `/api/volunteer/pickups/vol_id/${id}?`;
        for(const key in query){
            query_string = query_string.concat(`${key}=${query[key]}`);
        }
        const resp = await fetch(API_URL.concat(query_string), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Token " + token
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
    return resp;
    },
    get_my_pickups:async (query) =>{
        var query_string = API_URL.concat("/api/admin/pickup?");
        // query_string = query?query_string.concat(`?status=${query.status?query.status:0}`):query_string;
        // console.log(query_string);
        const id = await localStorage.getData('volunteer_id');
        for(const key in query){
            query_string = query_string.concat(`${key}=${query[key]}&`);
        }
        query_string = query_string.concat(`volunteer=${id}`);
        console.log(query_string);
        const resp = await fetch(query_string, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
    return resp;
    },
    
    getDrives: async()=>{
        const token = await localStorage.getData('auth_token');
        const volunteer_id = await localStorage.getData('volunteer_id');
        const resp = await fetch(API_URL.concat(`/api/volunteer/getDrives/${volunteer_id}`), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
        return resp;
    },

    acceptDrive: async(id)=>{
        const token = await localStorage.getData('auth_token');
        const volunteer_id = await localStorage.getData('volunteer_id');
        const resp = await fetch(API_URL.concat(`/api/volunteer/enrollDrive/${id}`), {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                volunteer_id: volunteer_id
            })
        })
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
        return resp;
    },

    auth_forgot: async (email) =>{
        const resp = await fetch(API_URL.concat('/api/volunteer/auth/forgot'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        .then((response)=>{
            console.log("Auth Forget res: ",response)
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
        return resp;
    },
    auth_forgot_verifyOTP: async (email, otp) =>{
        const resp = await fetch(API_URL.concat('/api/volunteer/auth/forgot/verifyOTP'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, otp: otp})
        })
        .then((response)=>{
            console.log("Auth Forget verify res: ",response)
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
        return resp;
    },

    auth_forgot_changePassword: async (email, otp, password) =>{
        const resp = await fetch(API_URL.concat('/api/volunteer/auth/forgot/changePassword'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, otp: otp, newPassword: password})
        })
        .then((response)=>{
            console.log("Auth Forget change pass res: ",response)
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
        return resp;
    },

    send_push_token: async(userId, pushToken)=>{
        const token = await localStorage.getData('auth_token');
        const resp = await fetch(API_URL.concat(`/api/admin/notifications/login`), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                userId: userId,
                token: pushToken,
                userType: "volunteer"
            })
        })
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            return json;
        })
        .catch((e) =>{
            console.log(e);
            console.log("error");
        })
        return resp;
    }        


    // createPickup: async (pickup_object) =>{
    //     var tok = await SecureStore.getItemAsync("auth_token");
    //     var token = concat("Token ",tok);
    //     const resp = await fetch(API_URL.concat("/api/volunteer/pickup/register"),{
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': "Token  " + tok 
    //           },
    //           body: JSON.stringify(pickup_object)
    //     })
    //     .then(async (response) => {
    //         if (response.status>=400){
    //             console.log("Bad request from server at createPickup");
    //             return false;
    //         }
    //         return response.json();
    //     })            
    //     .then(async (json) => {
    //         if(!json){return false}
    //         if (json.alreadyExists){
    //             console.log("Pickup already exists");
    //             return false
    //         }else{
    //             return true
    //         }
    //     })
    //     .catch(async (e) => console.log(e))
    //     return resp;
    // }


}