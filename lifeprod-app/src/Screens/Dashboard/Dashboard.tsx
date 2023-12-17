import EventEmitter from "../../Components/Utilities/EventEmitter";
import { ReactElement, SetStateAction, useState } from "react";
import { TodaysRadarView } from "./Components/RadarBoxComponents/TodaysRadarView";
import { DropdownRadarSelection } from "./Components/RadarBoxComponents/DropdownRadarSelection";
import { ActivitiesForm } from "./Components/ActivitiesComponents/ActivitiesForm";
import { Alert } from "../../Components/Alert/Alert";
import { entryRequest } from "./Services/DashboardServices";

import './Dashboard.css';

export const Dashboard = (): ReactElement => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDate, setActivityDate] = useState<Date>(new Date);
  const [activityTime, setActivityTime] = useState<Time>({hour: '', minute: ''});
  const [activityCategory, setActivityCategory] = useState<string>("");
  const [activityDescription, setActivityDescription] = useState<string>("");
  
  const handleTitleChange = (newTitle: SetStateAction<string>) => {
    setActivityTitle(newTitle);
  };
  
  const handleDateChange = (newDate: SetStateAction<Date>) => {
    setActivityDate(newDate);
  };
  
  const handleTimeChange = (newTime: SetStateAction<Time>) => {
    setActivityTime(newTime);
  };
  
  const handleCategoryChange = (newCategory: SetStateAction<string>) => {
    setActivityCategory(newCategory);
  };
  
  const handleDescriptionChange = (newDescription: SetStateAction<string>) => {
    setActivityDescription(newDescription);
  };

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

  const checkData = (): boolean => {
    const isTimeCharactersValid: RegExp = /^\d{1,2}$/;

    activityTime.hour = activityTime.hour || "0";
    activityTime.minute = activityTime.minute || "0";

    const conditions = [{
        validation: () => !(activityTitle.length >= 1 && activityTitle.length <= 32),
        alertMessage: "Title needs to be 1 to 32 characters"
      }, {
        validation: () => !(isTimeCharactersValid.test(activityTime.hour)),
        alertMessage: "Hour needs to be up to 2 numbers"
      }, {
        validation: () => !(isTimeCharactersValid.test(activityTime.minute)),
        alertMessage: "Minute needs to be up to 2 numbers"
      }, {
        validation: () => !(activityDescription.length >= 1 && activityDescription.length <= 500),
        alertMessage: "Description needs to be 1 to 500 characters"
      }, {
        validation: () => !(activityCategory),
        alertMessage: "Select a category"
      }
    ];

    for(const condition of conditions) {
      if(condition.validation()) {
        EventEmitter.dispatch({
          eventType: 'set-alert', 
          eventPayload: {
            alertType: 'error',
            alertMessage: condition.alertMessage
          }
        });
        return false;
      }
    }
    return true;
  }

  const timeToMinutes = (time: Time): number => {
    return Number(time.hour) * 60 + Number(time.minute);
  }

  const handleSubmit = (): void => {
    const entryRequestInfo: EntryRequest = {
      userId: sessionStorage.getItem('user-id'),
      title: activityTitle,
      date: activityDate,
      time: timeToMinutes(activityTime),
      category: activityCategory,
      description: activityDescription
    };

    if(checkData()) {
      entryRequest(entryRequestInfo);
    }
  };

  return (
    <>
      <a href="/login">Logout</a>
      <Alert />
      <div className="dashboard-box">
        <h2>Welcome</h2>
        <div className="dashboard-radar-content-box">
          <DropdownRadarSelection onSelect={handleSelectOptionChange} />
          {renderRadar()}
        </div>

        
        <div className="dashboard-entries-content-box">
          <ActivitiesForm 
            onTitleChange={handleTitleChange}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            onCategoryChange={handleCategoryChange}
            onDescriptionChange={handleDescriptionChange}
          />
        </div>

        <div className="button-row">
          <button>All Entries</button>
          <button>Edit Profile</button>
          <button onClick={handleSubmit}>Submit Entry</button>
        </div>
      </div>
    </>
  );
};