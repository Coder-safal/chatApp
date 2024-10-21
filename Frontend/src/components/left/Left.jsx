import React from 'react'
import Search from './Search'
import User from './User'
import Users from './Users'

function Left() {
    return (

        <div
            className='border border-blue-500 bg-slate-900 w-[30%]'
        >
            <h1 className='font-bold pt-2 px-11 text-3xl'>Chats</h1>
            <Search />
            <hr />
            <Users />

        </div>



    )
}

export default Left