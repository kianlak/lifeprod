import React, { ReactElement, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginInputField } from './Components/LoginInputField';
import { loginRequest } from './Services/LoginService';
import { Alert } from '../../Components/Alert/Alert';

import './Login.css'
import EventEmitter from '../../Components/Utilities/EventEmitter';

export const Login = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const checkLogin = (): boolean => {
    const isUsernameCharactersValid: RegExp = /^[a-zA-Z0-9]+$/;
    const isPasswordCharactersValid: RegExp = /^[a-zA-Z0-9@\$!%*?&]+$/;

    const conditions = [{
        validation: () => !(username.length >= 7 && username.length <= 16),
        alertMessage: "Username needs to be 7 to 16 characters"
      }, {
        validation: () => !isUsernameCharactersValid.test(username),
        alertMessage: "Username cannot include special characters"
      }, {
        validation: () => !(password.length >= 6 && password.length <= 32),
        alertMessage: "Password needs to be 6 to 32 characters"
      }, {
        validation: () => !isPasswordCharactersValid.test(password),
        alertMessage: "Password can only use these special characters: @, $, !, %, *, ?, &"
      }
    ];

    for(const condition of conditions) {
      if(condition.validation()) {
        EventEmitter.dispatch({
          eventType: 'set-alert', 
          eventPayload: {
            alertType: 'error',
            alertMessage: condition.alertMessage
          }
        });
        return false;
      }
    }
    return true;
  };

  const login = async (): Promise<void> => {
    if(checkLogin()) {
      const user: LoginInfo = {
        username: username,
        password: password
      }
      
      await loginRequest(user) ? handleDashboardRedirect() : {};
    }
  }

  const handleSignUpRedirect = (): void => {
    navigate("/sign-up");
  }

  const handleForgotPasswordRedirect = (): void => {
    navigate("/forgot-password");
  };

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
        </form>
        <div className='forget-password'><a href='#' onClick={handleForgotPasswordRedirect}>Forgot Password?</a></div>
        <button className="login-button" onClick={login}>Login</button>
        <div className='signup-text'>Don't have an account? <a href='#' onClick={handleSignUpRedirect}>Sign Up</a></div>
      </div>
    </>
  );
};