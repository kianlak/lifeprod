import React, { ReactElement, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginInputField } from './Components/LoginInputField';
import { Alert } from '../../Components/Alert/Alert';

import './Login.css'
import { loginRequest } from './Services/LoginService';

export const Login = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const checkLogin = async (): Promise<void> => {
    const user: LoginInfo = {
      username: username,
      password: password
    }
    
    await loginRequest(user) ? handleDashboardRedirect() : {};
  }

  const handleSignUp = (): void => {
    navigate("/signup");
  }

  const handleDashboardRedirect = (): void => {
    navigate("/dashboard");
  };

  return (
    <>
      <Alert />
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