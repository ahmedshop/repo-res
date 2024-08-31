import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

function GoogleCallback() {
    const {googleLoginAction} = useAuth()
    const location = useLocation()

    useEffect(() => {
        const authenticateGoogle = async () => {
            try {
                await googleLoginAction(`/auth/callback${location.search}`)
            } catch (error) {
                console.error("Authentication failed:", error);
            } 
        };

        authenticateGoogle();
    }, []);
}

export default GoogleCallback;