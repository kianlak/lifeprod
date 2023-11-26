import React, { ReactElement } from 'react';
import { ForgotPasswordInputField } from './ForgotPasswordInputField';
import EventEmitter from '../../../Components/Utilities/EventEmitter';
import { sendNewPasswordWithTokenRequest } from '../Services/ForgotPasswordService';
import { useNavigate } from 'react-router-dom';

interface TokenVerificationFormProps {
  resetToken: string;
  newPassword: string;
  retypeNewPassword: string;
  onChangeResetToken: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRetypeNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TokenVerificationForm = ({resetToken, newPassword, retypeNewPassword, onChangeResetToken, onChangeNewPassword, onChangeRetypeNewPassword}: TokenVerificationFormProps): ReactElement => {  
  const navigate = useNavigate();

  const checkPassword = async (): Promise<void> => {
    if(validatePassword()) {
      let email = sessionStorage.getItem('temp-user-email');

      const details: ForgotPasswordDetails = {
        token: resetToken,
        email: email ? email : "",
        password: newPassword
      };

      await sendNewPasswordWithTokenRequest(details) ? routeToDashboardPage() : {};
    }
  }
  
  const validatePassword = (): boolean => {
    const isPasswordCharactersValid: RegExp = /^[a-zA-Z0-9@\$!%*?&]+$/;

    const conditions = [ {
      validation: () => !(newPassword.length >= 6 && newPassword.length <= 32),
      alertMessage: "Password needs to be 6 to 32 characters"
      }, {
        validation: () => !isPasswordCharactersValid.test(newPassword),
        alertMessage: "Password can only use these special characters: @, $, !, %, *, ?, &"
      }, {
        validation: () => newPassword !== retypeNewPassword,
        alertMessage: "Passwords don't match"
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

  const routeToDashboardPage = (): void => {
    navigate('/dashboard');
  }

  return (
    <>
      <form>
        <ForgotPasswordInputField
          type='text'
          placeholder='Reset Token'
          value={resetToken}
          onChange={onChangeResetToken}
        />

        <ForgotPasswordInputField
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={onChangeNewPassword}
        />

        <ForgotPasswordInputField
          type='password'
          placeholder='Re-type New Password'
          value={retypeNewPassword}       
          onChange={onChangeRetypeNewPassword}
        />
      </form>
      <button className="fp-reset-password-button" onClick={checkPassword}>Reset Password</button>
    </>
  );
}