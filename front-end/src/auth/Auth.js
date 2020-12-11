import React, { useEffect, useState } from 'react';
import db from "../base";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        db.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoading(false);
        })
    }, []);
    return (
        <AuthContext.Provider value = {{currentUser, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};