import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        return JSON.parse(sessionStorage.getItem('token'));
    }
    const [token, setToken] = useState(getToken());

    
    const saveToken = (token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        setToken(token);
    }

    return [token, saveToken];
}