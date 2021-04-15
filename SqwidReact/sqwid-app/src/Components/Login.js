import React, { useEffect, useState } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../site.css';
import { CreateAccountModal } from './CreateAccountModal';

async function loginUser(credentials) {
    return fetch('http://localhost:52121/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function Login() {
    const [addModalShow, setModalShow] = useState(false);

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        saveToken(token);
        window.location.href = "/";
    }

    return (
        <div className="generalbackground">
            <div className="login-wrapper">
                <h1 className="homeheader">Please Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label style={{padding:15}}>
                        <p className="loginlabels">Username</p>
                        <input type="text" className="loginfields" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p className="loginlabels">Password</p>
                        <input type="password" className="loginfields" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit" className="btn btn-primary submitbtn">Submit</button>
                    </div>
                </form>
                <p className="createaccounttext">Don't have an account yet?<Button onClick={() => setModalShow(!addModalShow)} className="createaccountbtn">Create Account</Button></p>
            </div>
            <CreateAccountModal show={addModalShow} onHide={() => setModalShow(!addModalShow)}></CreateAccountModal>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}