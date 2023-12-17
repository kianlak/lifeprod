import { ResponsiveRadar } from "@nivo/radar";
import { ReactElement } from "react";

import './Radar.css';

export const TodaysRadarView = (): ReactElement => {
  const data = [{
      "category": "Work",
      "You": 108
    }, {
      "category": "Productivity",
      "You": 25
    }, {
      "category": "Social",
      "You": 101
    }, {
      "category": "Self-care",
      "You": 91
    }, {
      "category": "Entertainment",
      "You": 15
    }
  ];

  return (
    <ResponsiveRadar
      data={data}
      keys={['You']}
      indexBy="category"
      valueFormat=">-.2f"
      margin={{ top: 30, right: 90, bottom: 40, left: 90 }}

      colors={{ scheme: 'category10' }}
      borderColor={{ from: 'color' }}
      fillOpacity={0.3}
      blendMode="normal"
      borderWidth={1}

      gridLevels={6}
      gridShape="linear"
      gridLabelOffset={16}

      dotSize={8}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={1.5}

      motionConfig="stiff"
      
      legends={[{
        anchor: 'top-left',
        translateX: -75,
        translateY: -25,

        direction: 'column',
        symbolShape: 'circle',
        symbolSize: 12,

        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: '#999',
        effects: [{
          on: 'hover',
          style: {
            itemTextColor: '#000'
          }
        }]
      }]}
    />
  );
};
