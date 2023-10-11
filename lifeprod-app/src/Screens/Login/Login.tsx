import React, { ReactElement, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginInputField } from './Components/LoginInputField';
import { Alert } from '../../Components/Alert';

import './Login.css'

export const Login = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkLogin = () => {
    
  }

  const handleSignUp = () => {
    navigate("/signup");
  }

  return (
    <>
      <div>
        {errorMessage && <Alert type='error' message={errorMessage}></Alert>}
      </div>
      <div className='login-box'>
        <h2>LifeProd</h2>
        <form>
          <LoginInputField
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}
          />
          <LoginInputField
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
          />
          <div className='forget-password'><a href='#'>Forgot Password?</a></div>
        </form>
        <button className="login-button" onClick={checkLogin}>Login</button>
        <div className='signup-text'>Don't have an account? <a href='#' onClick={handleSignUp}>Sign Up</a></div>
      </div>
    </>
  );
};