import { ReactElement, useEffect, useState } from 'react';

import './ActivitiesDatePicker.css';

interface DatePickerProps {
  onChange: (date: Date) => void;
}

export const DatePicker = ({onChange}: DatePickerProps): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date);
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-");
    const newDate = new Date([month, day, year].join("-"));
    setSelectedDate(newDate);
    onChange(newDate);
  };

  useEffect(() => onChange(selectedDate), []);

  return (
    <div className="datepicker-container">
      <input
        type="date"
        value={selectedDate ? selectedDate.toISOString().substring(0, 10) : ''}
        onChange={handleDateChange}
      />
    </div>
  );
};