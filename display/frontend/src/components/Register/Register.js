import React, { useState } from 'react';
import PropTypes from 'prop-types'
import './Register.css';

async function registerUser(credentials) {
    return fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Register({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        if (confirm === password) {
            
            const data = await registerUser({
                username,
                password
            })
            if (!data.error && data.token) {
                setToken(data);
            }
        }
    }
    return(
        <div className="login-wrapper">
            <h1>Please Register</h1>
            <label>
                <p>Username</p>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                <p>Confirm Password</p>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}/>
            </label>
            <div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

Register.propTypes = {
    setToken: PropTypes.func.isRequired
}