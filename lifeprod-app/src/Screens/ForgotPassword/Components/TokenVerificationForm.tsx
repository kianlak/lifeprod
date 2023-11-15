import React, { ReactElement } from 'react';
import { ForgotPasswordInputField } from './ForgotPasswordInputField';

interface TokenVerificationFormProps {
  resetToken: string;
  newPassword: string;
  retypeNewPassword: string;
  onChangeResetToken: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRetypeNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TokenVerificationForm = ({resetToken, newPassword, retypeNewPassword, onChangeResetToken, onChangeNewPassword, onChangeRetypeNewPassword}: TokenVerificationFormProps): ReactElement => {
  return (
    <form>
      <ForgotPasswordInputField
        type='text'
        placeholder='Reset Token'
        value={resetToken}
        onChange={onChangeResetToken}
      />

      <ForgotPasswordInputField
        type='text'
        placeholder='New Password'
        value={newPassword}
        onChange={onChangeNewPassword}
      />

      <ForgotPasswordInputField
        type='text'
        placeholder='Re-type New Password'
        value={retypeNewPassword}
        onChange={onChangeRetypeNewPassword}
      />
    </form>
  );
}