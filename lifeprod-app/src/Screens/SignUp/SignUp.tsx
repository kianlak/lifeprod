import { ReactElement, useState, ChangeEvent } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { signUpRequest } from './Services/SignUpService';
import { SignUpIputField } from './Components/SignUpInputField';
import { Alert } from '../../Components/Alert/Alert';

import './SignUp.css'
import EventEmitter from '../../Components/Utilities/EventEmitter';

export const SignUp = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypedPassword, setRetypedPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();

  const checkSignUp = (): boolean => {
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

  const signUp = async (): Promise<void> => {
    if(checkSignUp()) {
      const user: SignUpInfo = {
        username: username,
        password: password,
        email: email
      };

      await signUpRequest(user) ? routeToDashboardPage() : {};
    }
  };
  
  const routeToLoginPage = (): void => {
    navigate("/login");
  };

  const routeToDashboardPage = (): void => {
    navigate("/dashboard");
  };

  return (
    <>
      <Alert />
      <div className='signup-box'>
        <h2>LifeProd</h2>
        <form>
          <SignUpIputField
            type='text'
            placeholder='Username'
            value={username}
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}
          />
          <SignUpIputField
            type='password'
            placeholder='Password'
            value={password}
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
          />
          <SignUpIputField
            type='password'
            placeholder='Re-type Password'
            value={retypedPassword}
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {setRetypedPassword(e.target.value)}}
          />       
          <SignUpIputField
            type='text'
            placeholder='Email'
            value={email}
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}
          />
        </form>
        <button className="signup-button" onClick={signUp}>Sign Up</button>
        <div className='login-text'>Already have an account? <a href='#' onClick={routeToLoginPage}>Login</a></div>
      </div>
    </>
  );
};