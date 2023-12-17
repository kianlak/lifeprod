import React, { ReactElement } from 'react';
import { Quotes } from "@phosphor-icons/react";

import './ActivitiesInputField.css';

interface ActivitiesInputFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ActivitiesInputField = ({placeholder, value, onChange}: ActivitiesInputFieldProps): ReactElement => {
  return(
    <div className='activities-input-container'>
      <Quotes className='login-icon' size={20} />
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};


