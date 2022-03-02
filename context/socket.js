import socketio from "socket.io-client";
import React from "react";
import {SOCKET_URL} from "../config.json";
const localStorage = require("../helpers/localStorage");

export const socket = socketio.connect(
    SOCKET_URL
);
export const initiateSocketConnection = async()=>{

    let prov_id = await localStorage.getData("volunteer_id");
    socket.emit("send id",{"_id":prov_id});
    console.log("Listening");
}
export const SocketContext = React.createContext();

