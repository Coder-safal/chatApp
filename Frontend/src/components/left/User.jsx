import React from 'react'
import { useConversation } from '../../stateManagement/userConversation.js';
import { useSocket } from "../../context/SocketContext.jsx";
export default function User({ user }) {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocket();

    const isSelected = selectedConversation?._id === user?._id;
    const isOnline = onlineUsers.includes(user?._id);


    const handleClick = async () => {
        setSelectedConversation(user);
    }
    return (
        <div
            onClick={handleClick}
            className={`flex py-3 px-4 hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-500" : ""}`}>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className='px-4'>
                <h1 className='font-semibold'>{user.userName}</h1>
                <span>{user.email}</span>
            </div>
        </div>
    )
}
