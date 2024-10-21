import React from 'react'

export default function Messege({ message }) {
    console.log("SenderId: ", message.senderId);
    const authUser = JSON.parse(localStorage.getItem("token"));
    const itsMe = authUser._id === message.senderId;
    console.log("authUsers: ", authUser._id);
    // console.log("itsMe: ", itsMe);

    return (
        <>
            <div style={{ maxHeight: "calc(80vh)" }} className='p-4'>
                <div className={`chat ${itsMe ? "chat-end" : "chat-start"}`}>
                    <div className={`chat-bubble ${itsMe ? "chat-bubble-accent" : "chat-bubble-info"} `}>
                        {message.message}
                    </div>
                </div>
            </div>
        </>
    )
}
