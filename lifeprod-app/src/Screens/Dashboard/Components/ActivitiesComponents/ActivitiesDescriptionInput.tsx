import { ReactElement, SetStateAction, useState } from 'react';
import './ActivitiesDescriptionInput.css';

interface ActivitiesDescriptionInputProps {
  value: string;
  onChange: (description: string) => void;
}

export const ActivitiesDescriptionInput = ({onChange}: ActivitiesDescriptionInputProps): ReactElement => {
  const [text, setText] = useState('');

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setText(event.target.value);
    onChange(text); 
  };

  return (
    <div>
      <textarea
        className="word-input"
        value={text}
        onChange={handleInputChange}
        placeholder="Description"
        maxLength={250}
      />
    </div>
  );
};