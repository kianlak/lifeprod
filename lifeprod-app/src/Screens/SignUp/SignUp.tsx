import React, { ReactElement, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signUpRequest } from './Services/SignUpService';
import { SignUpIputField } from './Components/SignUpInputField';
import { Alert } from '../../Components/Alert';

import './SignUp.css'

export const SignUp = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypedPassword, setRetypedPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const navigate = useNavigate();

  const checkSignUp = () => {
    const isUsernameCharactersValid: RegExp = /^[a-zA-Z0-9]+$/;
    const isPasswordCharactersValid: RegExp = /^[a-zA-Z0-9@\$!%*?&]+$/;
    const isEmailCharactersValid: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      }, {
        validation: () => password !== retypedPassword,
        alertMessage: "Passwords don't match"
      }, {
        validation: () => !isEmailCharactersValid.test(email),
        alertMessage: "Email is not valid"
      }
    ];

    for(const condition of conditions) {
      if(condition.validation()) {
        setAlertMessage(condition.alertMessage);
        return false;
      }
    }

    setAlertMessage("");
    return true;
  };

  const signUp = async () => {
    const user: User = {
      username: username,
      password: password,
      email: email
    };

    if(checkSignUp()) {
      try {
        const signedUp = await signUpRequest(user);
      
        if(signedUp) {
          setAlertMessage('User created successfully');
        } else {
          setAlertMessage('Failed to create user');
        }
      } catch (error) {
        setAlertMessage('User creation error');
        console.error('User creation error:', error);
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div>
        {alertMessage && <Alert type='error' message={alertMessage}></Alert>}
      </div>
      <div className='signup-box'>
        <h2>LifeProd</h2>
        <form>
          <SignUpIputField
            type='text'
            placeholder='Username'
            value={username}
            required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}
          />
          <SignUpIputField
            type='password'
            placeholder='Password'
            value={password}
            required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
          />
          <SignUpIputField
            type='password'
            placeholder='Re-type Password'
            value={retypedPassword}
            required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setRetypedPassword(e.target.value)}}
          />       
          <SignUpIputField
            type='text'
            placeholder='Email'
            value={email}
            required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}
          />
        </form>
        <button className="signup-button" onClick={signUp}>Sign Up</button>
        <div className='login-text'>Already have an account? <a href='#' onClick={handleLogin}>Login</a></div>
      </div>
    </>
  );
};