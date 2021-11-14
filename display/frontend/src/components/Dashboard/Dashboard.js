import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from '../App/useToken';

export default function Dashboard() {
    const [token, _] = useToken();
    const [panels, setPanels] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/panel').then(response => {
            setPanels(response.data.panels)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return(
        <>
            <h2>Dashboard</h2>
            {panels.map(panel => {
                <div>{panel.title}, something else</div>
            })}
        </>
    );
}