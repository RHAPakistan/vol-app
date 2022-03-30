import React from "react";
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';

import { styles } from "../styles/dashboardStyles";

export default Pickups = ({pickups, onClickPickup}) =>{

    return (
        <View >
      <Text style = {styles.heading} >Pickups</Text>
      <PickupModal modalVisible={modalVisible} setModalVisible={setModalVisible}
        pickup={popPickup} onClickPickup={onClick} onClickReject={onClickReject} />

      {/* get pickups */}
      {data.map((item) => (
        <PickupCard key = {item._id} pickup={item} onClickPickup={()=>{onClick(item)}} onClickReject={onClickReject} reject={true} />
      ))
      }
        </View>
    );
}