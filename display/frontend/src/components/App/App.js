import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import Login from '../Login/Login';
import useToken from './useToken';
import Register from '../Register/Register';



function App() {
    const [token, setToken] = useToken();
    if (!token) {
        return (
            <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken}/>}/>
                <Route path="/register" element={<Register setToken={setToken}/>}/>
            </Routes>
            </BrowserRouter>
        )
    }

    return (
        <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/preferences" element={<Preferences/>}/>
        </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;