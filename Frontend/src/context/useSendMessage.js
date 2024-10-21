import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useConversation } from '../stateManagement/userConversation.js'

function useSendMessage() {
    const { selectedConversation, setMessages, messages } = useConversation();
    const [loading, setLoading] = useState(false);


    const sendMessage = async (message) => {

        setLoading(true);
        if (selectedConversation && selectedConversation?._id) {

            try {
                const res = await axios.post(`/api/v1/message/send/${selectedConversation?._id}`, {
                    message
                })
                setMessages([...messages, res.data.data])
                setLoading(false);
                
            } catch (error) {
                console.log("Errors occurs: ", error);
                setLoading(false);
            }
        }
    }
    // sendMessage();

    return { sendMessage };
}

export default useSendMessage