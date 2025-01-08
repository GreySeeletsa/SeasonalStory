import React from 'react';
import { Line } from 'react-chartjs-2';

const WeatherGraph = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year',
          tooltipFormat: 'YYYY',
          displayFormats: {
            year: 'YYYY',
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherGraph;