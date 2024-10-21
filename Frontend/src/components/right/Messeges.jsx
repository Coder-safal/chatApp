import React from 'react'
import Messege from './Messege.jsx'
import useGetAllMessage from '../../context/useGetAllMessage.js'
import Loading from '../loading/Loading.jsx';

import GetSocketMessage from "../../context/GetMessage.jsx"

export default function () {
    const { loading, messages } = useGetAllMessage();
    // console.log("messages: ", messages);
    console.log("message length: ", messages.length);
    GetSocketMessage();
    return (
        <>

            <div style={{ maxHeight: "calc(80vh)" }} className='min-h-[80vh] overflow-y-auto'>
                {loading ? (<Loading />) : (messages.length > 0 && messages.map((message, index) => {

                    return <Messege key={index} message={message} />
                }))}

                {!loading && messages.length == 0 && (
                    <div className='h-[100%] w-full flex justify-center items-center '>
                        <p className='font-semibold mt-[30%]'>Say Hii!</p>
                    </div>
                )}
            </div>
        </>
    )
}
