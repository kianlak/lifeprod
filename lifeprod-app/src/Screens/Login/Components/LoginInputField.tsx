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
  return(
    <div className='login-input-container'>
      {placeholder === 'Username' ? <User className='login-icon' size={20} /> : <Lock className='login-icon' size={20} />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
