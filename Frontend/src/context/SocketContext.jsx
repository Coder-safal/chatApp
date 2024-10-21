import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useAuth } from "./AuthProvider.jsx";
import { io } from "socket.io-client";

export const socketContext = createContext();

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const { authUser } = useAuth();
    const [onlineUsers, setOnlineUsers] = useState([]);
    console.log("authUsers: ", authUser?._id)

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:8000/", {
                query: { userId: authUser._id, }
            });
            setSocket(socket);
            socket.on("getOnline", (users) => {
                setOnlineUsers(users)
                // console.log("Onlineusers: ", users);
            })
        }
    }, [authUser])

    return <socketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </socketContext.Provider>
}

export const useSocket = () => useContext(socketContext);