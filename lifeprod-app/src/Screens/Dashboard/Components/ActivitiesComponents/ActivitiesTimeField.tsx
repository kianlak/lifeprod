import { ChangeEvent, ReactElement, useState } from 'react';
import { Timer } from '@phosphor-icons/react';

import './ActivitiesTimeField.css';

interface DatePickerProps {
  value: Time;
  onChange: (time: Time) => void;
}

export const ActivitiesTimeField = ({onChange}: DatePickerProps): ReactElement => {
  const [time, setTime] = useState<Time>({ hour: '', minute: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime({ ...time, [e.target.name]: e.target.value });
    onChange({ ...time, [e.target.name]: e.target.value });
  };

  return(
    <div className="custom-time-input">
      <Timer size={20} />
      <input 
        type="text" 
        name="hour" 
        value={time.hour}
        onChange={handleChange}
        maxLength={2}
        placeholder="HH" 
      />
      <span>hr</span>
      <input 
        type="text" 
        name="minute" 
        value={time.minute} 
        onChange={handleChange} 
        maxLength={2}
        placeholder="MM" 
      />
      <span>min</span>
    </div>
  );
};