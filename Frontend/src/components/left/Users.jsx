import React from 'react'
import User from './User'

import { useGetAllusers } from '../../context/GetAllUsers.jsx'
export default function Users() {
    const { loading, setLoading, allUsers, setAllUsers } = useGetAllusers();
    console.log("All users: ", allUsers);
    return (
        <div style={{ maxHeight: "calc(80vh)" }} className='overflow-y-auto'>

            {allUsers.map((user, index) => {
                return <User user={user} key={user._id} />
            })}

        </div>
    )
}
