import React, { useState } from 'react';
import PropTypes from 'prop-types'
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await loginUser({
            username,
            password
        });
        if (!data.error && data.token) {
            setToken(data);
        }
    }
    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}