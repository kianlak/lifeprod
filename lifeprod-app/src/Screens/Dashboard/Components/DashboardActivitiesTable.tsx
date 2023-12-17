import { ReactElement, useState } from 'react';

import './DashboardActivitiesTable.css';

export const DashboardActivitiesTable = (): ReactElement => {
  const [data] = useState([
    { activity: 'Coding', timeSpent: '4 hours', category: 'Productivity', description: 'Working on React project' },
    { activity: 'Meeting', timeSpent: '2 hours', category: 'Work', description: 'Team meeting for project planning' },
    // Add more data as needed
  ]);

  const renderTableHeader = () => {
      let header = Object.keys(data[0]);
      return header.map((key, index) => (
          <th key={index}>{key.toUpperCase()}</th>
      ));
  };

  const renderTableData = () => {
      return data.map((row, index) => (
          <tr key={index}>
              <td>{row.activity}</td>
              <td>{row.timeSpent}</td>
              <td>{row.category}</td>
              <td>{row.description}</td>
          </tr>
      ));
  };

  return (
      <div>
          <table>
              <tbody>
                  <tr>{renderTableHeader()}</tr>
                  {renderTableData()}
              </tbody>
          </table>
      </div>
  );
}