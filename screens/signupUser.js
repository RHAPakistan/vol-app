import React, {useState} from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import InductionForm from '../components/InductionForm'
var volunteerApi = require("../helpers/volunteerApi.js");

const signupUser = ({navigation}) =>{
    const placeRequest = async (value)=>{
        console.log("Form Data",value);
        const resp = await volunteerApi.create_induction_request(value);
        return resp;
    }
    const onSubmit = (value) => {
		if (value ==false) {
			alert("Kindly fill required fields")
		} 
        else if(value){
            Alert.alert(
                "Request Submission",
                "Are you sure the information is correct?",
                [
                    {
                        text:"Yes",
                        onPress: () => {
                            placeRequest(value)
                            .then((response)=>{
                                //console.log("Response from induction request: ",response);
                                alert(response.message)
                            })
                            .catch((e)=>{
                                console.log(e);
                            });
                            navigation.goBack();   
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
		else {
			console.log("Error occured when submiting form");
		}
	};
    return(
        <View style={thisStyles.container}>
            <Text style={thisStyles.heading}>Induction Registeration Form</Text>
            <View style={thisStyles.line}></View>
            <InductionForm onSubmit={onSubmit}></InductionForm>
            
        </View>
    );
}

const thisStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: '15%'
    },
    heading: {fontSize: 18, textAlign: "center", paddingBottom: '5%', fontWeight: 'bold'},
    line: {borderWidth: 0.5,borderColor:'black', margin:10}

})
export default signupUser;