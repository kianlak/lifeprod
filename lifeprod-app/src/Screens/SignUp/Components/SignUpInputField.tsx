import React, {ReactElement} from 'react';
import { User, Lock, Envelope, LockOpen } from "@phosphor-icons/react";

import './SignUpInputField.css';

interface SignUpInputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SignUpIputField = ({type, placeholder, value, required, onChange}: SignUpInputFieldProps): ReactElement => {
  const iconJSXElements: Record<string, JSX.Element> = {
    'Username': <User className='signup-icon' size={20} />,
    'Password': <LockOpen className='signup-icon' size={20} />,
    'Re-type Password': <Lock className='signup-icon' size={20} />,
    'Email': <Envelope className='signup-icon' size={20} />
  };

  const getIconJSXElement = (key: string): JSX.Element => {
    return iconJSXElements[key];
  };

  return(
    <div className='signup-input-container'>
      {getIconJSXElement(placeholder)}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
      />
      {required && <span className="signup-required-asterisk">*</span>}
    </div>
  );
};
