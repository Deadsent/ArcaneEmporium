import React from 'react';
import { useState } from 'react';
import { loginUser, registerUser } from '../axios-services';
const Login = () => {    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (username, password) => {
        try {
            const loggedUser = await loginUser({username, password})
            console.log(loggedUser)
        } catch (error) {
            console.error("ERROR IN handleLogin", error)
            throw error
        }
    }
    const handleRegister = async (username, password) => {
        try {
            const registeredUser = await registerUser({username, password})
            console.log(registeredUser)
        } catch (error) {
            console.error("ERROR IN handleRegister", error)
            throw error
        }
  }
    
    return (
        <div>
            <form>
                <label>Username: </label>
                <input 
                type='username'
                placeholder='Please Input Your Username'
                value={username}
                onChange={(event)=> {
                    setUsername(event.target.value)
                    console.log("Username Log",username)
                }}
                ></input>
                <label>Password: </label>
                <input
                type='password'
                placeholder='Please Input Your Password'
                value={password}
                onChange={(event)=> {
                    setPassword(event.target.value)
                    console.log("Password Log", password)
                }}
                ></input>
                <button onClick={(event) => {
                    event.preventDefault()
                    handleLogin(username, password)
                }}>Login</button>
                <button onClick={(event) => {
                    event.preventDefault()
                    handleRegister(username, password)
                }}>Register</button>
            </form>
        </div>
    );
};

export default Login;