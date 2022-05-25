import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, Alert } from 'react-native';

export default function Maps({coordinate, setIsMapView, setCoordinate, setAssignedCoordinate}) {
  
    const latDel = 0.2022;
    const lngDel = 0.2421;
    const openMaps = () =>{
        if(coordinate){
          const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
          const latLng = `${coordinate.latitude},${coordinate.longitude}`;
          const label = 'Custom Label';
          const url = Platform.OS === 'ios' ? `${scheme}${label}@${latLng}` : `${scheme}${latLng}(${label})`
          Linking.openURL(url);
        }
    }
    const assigningLocation = () =>{
        setAssignedCoordinate(coordinate);
        console.log("Coordinates are: ",coordinate);
        setIsMapView(false);
        Alert.alert("Destination Assigned!",`Set coordinates are: ${coordinate.latitude}, ${coordinate.longitude}`)
    }
  return (
    <View style={styles.container}>
        <View>
          <MapView
            loadingEnabled
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={
              coordinate?{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                latitudeDelta: latDel,
                longitudeDelta: lngDel,
            }
            :
            {
              latitude: 24.8607,
              longitude: 67.0011,
              latitudeDelta: latDel,
              longitudeDelta: lngDel,
            }
          }
          >
            <Marker 
              draggable
              coordinate={coordinate?{ latitude : coordinate.latitude , longitude : coordinate.longitude }:
              {latitude: 24.8607,longitude: 67.0011}} 
              onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
            />

          </MapView>
        </View>
        <View>
            <Text style={styles.text}>Instruction: You need to press and hold to make the pointer movable</Text>
            <View style={styles.row}>
                <TouchableOpacity onPress={()=>setIsMapView(false)} style={styles.backButton}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={openMaps} style={styles.mapsButton}>
                    <Text style={styles.buttonText}>View in Maps</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>assigningLocation()} style={styles.destButton}>
                    <Text style={styles.buttonText}>Set Destination</Text>
                </TouchableOpacity>

            </View>
            <View>
                
            </View>
        </View>
   </View>
  );
}
const button = {
    margin: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
    height: 50,
    borderRadius: 5
    
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    
  },
  map: {
    height: 500,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backButton:{
    ...button,
    backgroundColor: '#EB1515',
    width: '25%'
  },
  mapsButton:{
    ...button,
    backgroundColor: '#ADD8E6',
  },
  destButton:{
    ...button,
    backgroundColor: '#165E2E',
    width: '30%'
  },
  text: {
    margin: '5%',
    fontSize: 16,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
 });