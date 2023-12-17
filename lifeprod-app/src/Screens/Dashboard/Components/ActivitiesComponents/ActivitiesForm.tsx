import React, { ReactElement, useState } from 'react';
import { ActivitiesInputField } from './ActivitiesInputField';
import { ActivitiesTimeField } from './ActivitiesTimeField';
import { ActivitiesCategoryDropdown } from './ActivitiesCategoryDropdown';
import { DatePicker } from './ActivitiesDatePicker';
import { ActivitiesDescriptionInput } from './ActivitiesDescriptionInput';

import './ActivitiesForm.css';

interface ActivitiesFormProps {
  onTitleChange: (title: string) => void;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: Time) => void;
  onCategoryChange: (category: string) => void;
  onDescriptionChange: (description: string) => void;
}

export const ActivitiesForm = ({onTitleChange, onDateChange, onTimeChange, onCategoryChange, onDescriptionChange}: ActivitiesFormProps): ReactElement => {
  const [title, setTitle] = useState<string>("");
  const [, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Time>({hour: '', minute: ''});
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <form className='activities-form'>
      <div className='row-fields'>
        <ActivitiesInputField 
          placeholder='Title'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
            onTitleChange(e.target.value);
          }}
        />
      </div>

      <div className='row-fields'>
        <DatePicker
          onChange={(selectedDate: Date) => {
            setDate(selectedDate);
            onDateChange(selectedDate);
          }}
        />

        <ActivitiesTimeField 
          value={time}
          onChange={(newTime: Time) => {
            setTime(newTime);
            onTimeChange(newTime);
          }}
        />

        <ActivitiesCategoryDropdown 
          selectedOption={category}
          onSelect={(newCategory) => {
            setCategory(newCategory);
            onCategoryChange(newCategory);
          }}
        />
      </div>

      <div className='row-fields' style={{display: "block"}}>
        <ActivitiesDescriptionInput 
          value={description}
          onChange={(newDescription) => {
            setDescription(newDescription);
            onDescriptionChange(newDescription);
          }}
        />
      </div>
    </form>
  );
};
