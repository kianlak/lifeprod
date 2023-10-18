import React, { ReactElement, useEffect, useState } from 'react';
import { CheckCircle, WarningOctagon } from "@phosphor-icons/react";
import EventEmitter from '../Utilities/EventEmitter';

import './Alert.css';

export const Alert = (): ReactElement | null => {
  const [alertType, setAlertType] = useState<'error' | 'warning' | 'success'>();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  
  const icon = (() => {
    switch(alertType) {
      case 'error':
        return <WarningOctagon size={28}/>;
      case 'success': 
        return <CheckCircle size={28}/>
    }
  })()

  EventEmitter.subscribe({
    eventType: 'set-alert',
    subscriberId: 'alert-component',
    onEvent: ({ alertType, alertMessage }) => {
      setIsActive(true);
      setIsVisible(true);
      setAlertType(alertType);
      setAlertMessage(alertMessage);
    }
  });

  const onAnimationEndHandler = () => {
    if(!isActive) {
      setIsVisible(false);
      setAlertMessage("");
    }
  }

  useEffect(() => {
    if(!alertMessage) return ;

    clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        setIsActive(false);
      }, 5000)
    );
  }, [alertMessage])

  return (
    <>
      {isVisible && 
        <div 
          className={`alert ${alertType} ${isActive ? "active" : "inactive"}`}
          onAnimationEnd={onAnimationEndHandler}
        >
          {icon}
          {alertMessage}
        </div>
      }
    </>
  );
};