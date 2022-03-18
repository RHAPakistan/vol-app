
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#155F30',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerDashboard: {
      flex: 1,
      backgroundColor: '#F0F0F0',
      // alignItems: 'center',
      // justifyContent: 'flex-start',
      paddingTop:50,
      paddingLeft: 5,
      paddingRight: 5
    },
    text: {
      color: 'white',
      position: 'absolute',
      bottom: 10
    },
    welcome:{
      fontSize: 20,
      width: '95%',
      borderBottomColor: '#155F30',
      borderBottomWidth:  1
    },
    button1: {
      backgroundColor: 'white',
      margin: 5,
      padding: 10,
      width: '50%',
      alignItems: 'center',
      marginTop: 100,
      borderRadius: 100
    },
    button2: {
      backgroundColor: 'white',
      margin: 5,
      padding: 10,
      width: '50%',
      alignItems: 'center',
      margin: 20,
      borderRadius: 100
    },
    createPickUpRequest:{
      backgroundColor: 'white',
      margin: 5,
      padding: 10,
      width: '95%',
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 20,
      borderRadius: 40      
    },
    button: {
      width: 280,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
      marginTop: 20

  },
  buttonText: {
      color: '#043316',
      fontSize: 16,
      fontWeight: 'bold'
  },
    pickupButtonText: {
      color: '#006400',
      alignItems: 'center',
      marginTop: 20,
      fontSize: 20,
      paddingLeft: 40
    },
    buttonsContainer: {
      marginBottom: '10'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    heading: {
      color: "green",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });