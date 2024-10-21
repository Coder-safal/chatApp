import React, { useEffect, useState } from 'react'
import { useConversation } from '../stateManagement/userConversation.js';
import axios from 'axios';

function useGetAllMessage() {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {

        const getMessages = async () => {

            setLoading(true);

            if (selectedConversation && selectedConversation?._id) {

                try {
                    const res = await axios.get(`/api/v1/message/getAllMessage/${selectedConversation?._id}`);
                    if (res.data && res.data?.data && res.data.data[0]?.messages) {
                        setMessages(res.data.data[0].messages);
                    }
                    else {
                        setMessages([]);
                    }
                    console.log("response data: ", res.data);
                    setLoading(false);

                } catch (error) {
                    setLoading(false);
                    console.log("Errors in getAllMessage ", error);
                }
            }

        }
        getMessages();

    }, [selectedConversation, setMessages]);

    return { loading, messages };
}

export default useGetAllMessage