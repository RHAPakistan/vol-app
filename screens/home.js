import React, {useState} from "react";
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import { styles } from "./styles";
import LoginUser from "../components/LoginUser";
import signupUser from "./signupUser";

const HomeScreen = ({navigation}) => {

  const [isUserLoginClicked, setIsUserLoginClicked] = useState(false);
  const [isSignupClicked, setIsSignupClicked] = useState(false);

  var logo = require('../assets/logo.jpg');
  const userLoginClicked = () => {
    console.log("this was clicked");
    setIsUserLoginClicked(true);
  }
  const signupClicked = () => {
    setIsSignupClicked(true);
    navigation.navigate("signupUser");
  }

  const shutDownModal = () => {
    setIsUserLoginClicked(false);
    setIsSignupClicked(false);
  }

  return (
    
    <View style={styles.container} >
      <Image source={logo} onPress={() => { setIsUserLoginClicked(!isUserLoginClicked) }} />
      {isUserLoginClicked ? <LoginUser navigation={navigation} shutDownModal={shutDownModal}></LoginUser>
        
          :
          <View>
            <TouchableOpacity style={styles.button} onPress={userLoginClicked}>
              <Text style={styles.buttonText}>User Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={signupClicked}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
      }
      <Text style={styles.text}>Volunteer App</Text>

    </View>

    );
  }


export default HomeScreen;

