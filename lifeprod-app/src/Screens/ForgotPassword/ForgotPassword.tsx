import { ReactElement, useState } from 'react';
import { Alert } from '../../Components/Alert/Alert';
import { TokenVerificationForm } from './Components/TokenVerificationForm';
import { EmailVerificationForm } from './Components/EmailVerificationForm';

import './ForgotPassword.css'
import { useNavigate } from 'react-router-dom';
import { CaretCircleLeft } from '@phosphor-icons/react';

export const ForgotPassword = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [retypeNewPassword, setRetypeNewPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleVerifyEmail = () => {
    setValidEmail(true);
  };

  const routeToLoginPage = () => {
    navigate('/login');
  };

  return (
    <>
     <Alert />
      <div className='fp-box'>
        <a href='#' onClick={routeToLoginPage} className='fp-icon-button'>
          <CaretCircleLeft size={32} />
        </a>
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