import { ReactElement } from "react";

import './ActivitiesCategoryDropdown.css';

interface ActivitiesCategoryDropdownProps {
  selectedOption: string;
  onSelect: (value: string) => void;
}

export const ActivitiesCategoryDropdown = ({onSelect }: ActivitiesCategoryDropdownProps): ReactElement => {
  return (
    <div>
      <select className="activities-category-dropdown" onChange={(e) => onSelect(e.target.value)}>
        <option value="">Category</option>
        <option value="Work">Work</option>
        <option value="Productivity">Productivity</option>
        <option value="Social">Social</option>
        <option value="Self-care">Self-care</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </div>
  );
}