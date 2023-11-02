import { ReactElement, useState, ChangeEvent } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { signUpRequest } from './Services/SignUpService';
import { SignUpIputField } from './Components/SignUpInputField';
import { Alert } from '../../Components/Alert/Alert';

import { axiosInstance } from '../../Axios';

import './SignUp.css'
import EventEmitter from '../../Components/Utilities/EventEmitter';

export const SignUp = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypedPassword, setRetypedPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");
  const [xsrfToken, setXsrfToken] = useState<string[] | undefined>(undefined);


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
    const user: User = {
      username: username,
      password: password,
      email: email
    };

    if(checkSignUp()) {
      try {
        axiosInstance.post("http://localhost:8080/api/user/signup", user)
        .then(response => {
          console.log('Response Headers:', response.headers);
        })
        .catch(error => {
          console.log(error);
        })

        if(true) {
          setAlertMessage('User created successfully');
          setAlertType('success');
        } else {
          EventEmitter.dispatch({
            eventType: 'set-alert', 
            eventPayload: {
              alertType: 'error',
              alertMessage: "Something went wrong, please restart the application"
            }
          });
        }
      } catch (error) {
        EventEmitter.dispatch({
          eventType: 'set-alert', 
          eventPayload: {
            alertType: 'error',
            alertMessage: "User with the same email or username already exists"
          }
        });
      }
    }
  };

  const test = async () => {  
    axiosInstance.get('http://localhost:8080/api/user/all')
    .then(response => {
    })
    .catch(error => {
      console.log(error);
    })
  };
  
  const handleLogin = (): void => {
    navigate("/login");
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
        <div className='login-text'>Already have an account? <a href='#' onClick={handleLogin}>Login</a></div>
      </div>
      <button className="signup-button" onClick={test}>Sign Up</button>
    </>
  );
};