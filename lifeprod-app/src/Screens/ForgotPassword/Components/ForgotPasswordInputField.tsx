import React, {ReactElement} from 'react';
import { Lock, Envelope, LockOpen, Key } from "@phosphor-icons/react";

import './ForgotPasswordInputField.css';

interface ForgotPasswordInputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ForgotPasswordInputField = ({type, placeholder, value, onChange}: ForgotPasswordInputFieldProps): ReactElement => {
  const inputField = (): JSX.Element => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }

  const iconJSXElements: Record<string, JSX.Element> = {
    'Email': <Envelope className='signup-icon' size={20} />,
    'Reset Token': <Key className='signup-icon' size={20} />,
    'New Password': <LockOpen className='signup-icon' size={20} />,
    'Re-type New Password': <Lock className='signup-icon' size={20} />,
  };

  const getIconJSXElement = (key: string): JSX.Element => {
    return iconJSXElements[key];
  };

  return(
    <div className='fp-input-container'>
      {getIconJSXElement(placeholder)}
      {inputField()}
    </div>
  );
};
