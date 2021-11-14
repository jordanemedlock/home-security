import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import Login from '../Login/Login';
import useToken from './useToken';
import Register from '../Register/Register';
import {Container, Nav, Navbar} from 'react-bootstrap';



function App() {
    const [token, setToken] = useToken();

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href='/'>Home Security</Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar-nav'/>
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/preferences">Preferences</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {token?.token ? (
                                <>Signed in as: {token.username}</>
                            ) : (
                                <><a href="/login">Login</a> <a href="/register">Register</a></>
                            )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
            <h1>Home Security</h1>
            <BrowserRouter>
            <Routes>
                {token?.token ? (
                    <>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/preferences" element={<Preferences/>}/>
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Login setToken={setToken}/>}/>
                        <Route path="/login" element={<Login setToken={setToken}/>}/>
                        <Route path="/register" element={<Register setToken={setToken}/>}/>
                    </>
                )}
            </Routes>
            </BrowserRouter>
            </Container>
        </>
    );
}

export default App;