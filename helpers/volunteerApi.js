import { concat } from 'react-native-reanimated';
import { retrySymbolicateLogNow } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import {API_URL} from "../config.json";
import {initiateSocketConnection} from "../context/socket";
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
                return true
            }else{
                return false
            }
        })
        .catch((e) => {
            console.log(e);
            console.log("error");
        });
        return resp
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
    get_pickups_by_vol_id: async()=>{
        const token = await localStorage.getData('auth_token');
        const id = await localStorage.getData('volunteer_id');
        const resp = await fetch(API_URL.concat(`/api/volunteer/pickups/vol_id/${id}`), {
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