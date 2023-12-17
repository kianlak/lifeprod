import { ReactElement } from "react";

import './DropdownRadarSelection.css'

export const DropdownRadarSelection = ({ onSelect }: { onSelect: (value: string) => void }): ReactElement => {
  return (
    <div>
      <select className="dashboard-dropdown" onChange={(e) => onSelect(e.target.value)}>
        <option value="Today">Today</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
    </div>
  );
}