import { ReactElement, useState } from "react";
import { TodaysRadarView } from "./Components/TodaysRadarView";
import { DropdownRadarSelection } from "./Components/DropdownRadarSelection";

import './Dashboard.css';

export const Dashboard = (): ReactElement => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const renderRadar = () => {
    switch (selectedOption) {
      case 'Today':
        return <TodaysRadarView />;
      default:
        return null;
    }
  };

  return (
    <>
      <a href="/login">Logout</a>
      <div className="dashboard-box">
        <h2>Welcome back</h2>
        <div className="dashboard-radar-content-box">
          <DropdownRadarSelection onSelect={handleSelectOptionChange} />
          {renderRadar()}
        </div>
      </div>
    </>
  );
};