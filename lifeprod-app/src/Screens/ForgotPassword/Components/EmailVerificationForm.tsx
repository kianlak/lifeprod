import React, { ReactElement } from 'react';
import { ForgotPasswordInputField } from './ForgotPasswordInputField';
import EventEmitter from '../../../Components/Utilities/EventEmitter';
import { sendEmailWithTokenRequest } from '../Services/ForgotPasswordService';

interface EmailVerificationFormProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailVerified: () => void;
}

export const EmailVerificationForm = ({ email, onChange, emailVerified }: EmailVerificationFormProps): ReactElement => {
  const isEmailCharactersValid: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checkEmail = async (): Promise<void> => {
    if(validateEmail(email)) {
      await sendEmailWithTokenRequest(email) ? emailVerified() : "";
    }
  }

  const validateEmail = (email: string): boolean => {
    if(!isEmailCharactersValid.test(email)) {
      EventEmitter.dispatch({
        eventType: 'set-alert', 
        eventPayload: {
          alertType: 'error',
          alertMessage: 'Email is not valid'
        }
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <form>
        <ForgotPasswordInputField
          type='text'
          placeholder='Email'
          value={email}
          onChange={onChange}
        />
      </form>
      <button className="fp-button" onClick={checkEmail}>Send Email</button>
    </>
  );
}