import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
export const authcontext = createContext();


const AuthContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticatedAndAdmin, setIsAuthenticatedAndAdmin] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const authenticateUser = () => {
        setIsAuthenticated(true);
    };
    const authenticateAdmin = () => {
        setIsAuthenticatedAndAdmin(true);
    };


    const logoutUser = () => {
        // const accessToken = await response.json()
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate("/");
        window.location.reload();
    };

    return (
        <authcontext.Provider value={{ isAuthenticated, authenticateUser, logoutUser, isAuthenticatedAndAdmin, authenticateAdmin }}>
            {props.children}
        </authcontext.Provider>
    );
};

export default AuthContextProvider;
