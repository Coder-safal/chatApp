import axios from 'axios';
import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
export default function Logout() {

    const handleLogout = async () => {
        const response = await axios.get("/api/v1/user/logout");
        localStorage.removeItem("token");
        console.log(response.data);
        alert(response.data.message);
        window.location.reload();
    }
    return (
        <div className='w-[5%] flex flex-col justify-end px-2'>

            <button onClick={handleLogout}>
                <RiLogoutBoxLine className='text-5xl p-3 font-bold hover:bg-slate-500 rounded-full' />
            </button>
        </div>
    )
}
