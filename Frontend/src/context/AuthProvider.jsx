import React, { useContext, useState } from 'react'
import Cookies from "js-cookie";
import { createContext } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const initialState = Cookies.get("token") || localStorage.getItem("token");
    const [authUser, setAuthUser] = useState(initialState ? JSON.parse(initialState) : undefined);
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext);