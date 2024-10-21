import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';

export default function () {
    const [message, setMessage] = useState("");

    const { sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessage(message);
        setMessage("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex justify-center'>
                <div className=' w-[70%]'>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <button type='submit' className='px-1'>
                    <IoSend className='text-5xl p-3 hover:bg-slate-600 rounded-full' />
                </button>
            </div>
        </form>
    )
}
