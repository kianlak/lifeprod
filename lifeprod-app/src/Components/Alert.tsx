import React, {FC, ReactElement, useEffect, useState} from 'react';
import { WarningDiamond } from "@phosphor-icons/react";
import './Alert.css';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

export const Alert = ({type, message}: AlertProps): ReactElement => {
  const [icon, setIcon] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (type === 'error') {
      setIcon(<WarningDiamond size={24}/>);
    } else {
      setIcon(null);
    }
  }, [type]);

  return (
    <div className={`alert ${type}`}>
      {icon && <div className="alert-icon">{icon}</div>}
      {message}
    </div>
  );
};