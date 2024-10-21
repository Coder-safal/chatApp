import React from 'react'
import { useConversation } from '../../stateManagement/userConversation.js'
import { useSocket } from "../../context/SocketContext.jsx";


export default function ChatUser() {
    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocket();
    const isOnline = onlineUsers.includes(selectedConversation?._id);

    return (
        <div className='flex shadow-xl py-2 h-[12vh] px-6 bg-gray-600 hover:bg-gray-700'>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>

            <div className='px-3'>
                <h1 className='font-bold'>{selectedConversation?.userName}</h1>
                {/* <h1>Anu</h1> */}
                <span>{isOnline?"Online":"Offline"}</span>
            </div>

        </div>
    )
}
