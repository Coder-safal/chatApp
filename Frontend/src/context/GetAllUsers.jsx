import axios, { all } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookie from "js-cookie";

export const allUsersContext = createContext();
export default function GetAllUsers({ children }) {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading

            try {
                // Fetch the token from localStorage
                const data = JSON.parse(localStorage.getItem("token"));
                if (data && data.refreshToken) {
                    const token = data.refreshToken;

                    // Make the API request with the Authorization header
                    const response = await axios.get("/api/v1/user/getAlluser", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    // Set the received users data
                    setAllUsers(response.data.data);
                    // console.log(response.data.data);
                    // console.log("All users get:", allUsers);
                } else {
                    console.error("No token found in localStorage");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false); // Stop loading after fetching data or on error
            }
        };

        fetchData(); // Call the async function

    }, []);



    return (
        <allUsersContext.Provider value={{ loading, setLoading, allUsers, setAllUsers }}>
            {children}
        </allUsersContext.Provider >
    )
}

export const useGetAllusers = () => useContext(allUsersContext);