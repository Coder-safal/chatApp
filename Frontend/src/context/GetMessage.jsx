import React, { useEffect } from 'react'
import { useSocket } from './SocketContext'
import { useConversation } from '../stateManagement/userConversation';

function GetSocketMessage() {
    const { socket } = useSocket();
    const { messages, setMessages } = useConversation();

    useEffect(() => {

        if (socket) {
            socket.on("getMessage", (message) => {
                setMessages([...messages, message]);
            })
        }
        // return socket.off("getMessage");


    }, [socket, messages, setMessages]);


}

export default GetSocketMessage