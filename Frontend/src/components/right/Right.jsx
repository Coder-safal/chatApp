import React from 'react'
import ChatUser from './ChatUser'
import Messeges from './Messeges'
import Type from './Type'

function Right() {
    return (
        <div className='text-white border border-white w-[70%] bg-slate-800'>
            <ChatUser />
            <Messeges />
            <Type />
        </div>
    )
}

export default Right