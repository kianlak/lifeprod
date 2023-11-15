import { ReactElement, useState } from 'react';
import { Alert } from '../../Components/Alert/Alert';
import { TokenVerificationForm } from './Components/TokenVerificationForm';
import { EmailVerificationForm } from './Components/EmailVerificationForm';

import './ForgotPassword.css'

export const ForgotPassword = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [retypeNewPassword, setRetypeNewPassword] = useState<string>("");

  const handleVerifyEmail = () => {
    // Callback function to change the state in the parent component
    setValidEmail(true);
  };

  return (
    <>
     <Alert />
      <div className='fp-box'>
        <h2>Forgot Password</h2>
        {validEmail ? (
          <TokenVerificationForm
            resetToken={resetToken}
            newPassword={newPassword}
            retypeNewPassword={retypeNewPassword}
            onChangeResetToken={(e) => setResetToken(e.target.value)}
            onChangeNewPassword={(e) => setNewPassword(e.target.value)}
            onChangeRetypeNewPassword={(e) => setRetypeNewPassword(e.target.value)}
          />
        ) : (
          <EmailVerificationForm
            email={email}
            onChange={(e) => setEmail(e.target.value)}
            emailVerified={handleVerifyEmail}
          />
        )}
      </div>
    </>
  );
};