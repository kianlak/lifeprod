import React, {ReactElement} from 'react';
import { User, Lock } from "@phosphor-icons/react";

import './LoginInputField.css';

interface LoginInputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginInputField = ({type, placeholder, value, onChange}: LoginInputFieldProps): ReactElement => {
  const iconJSXElements: Record<string, JSX.Element> = {
    'Username': <User className='login-icon' size={20} />,
    'Password': <Lock className='login-icon' size={20} />
  };

  const getIconJSXElement = (key: string): JSX.Element => {
    return iconJSXElements[key];
  };

  return(
    <div className='login-input-container'>
      {getIconJSXElement(placeholder)}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};


