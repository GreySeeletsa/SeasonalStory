import React, { useEffect, useState } from 'react';
import WeatherGraph from '../components/WeatherGraph';

const fetchHistoricalWeatherData = async (city) => {
  // Fetch data from your API or database
  // Format the data for Chart.js
  const response = await fetch(`YOUR_API_ENDPOINT`);
  const jsonData = await response.json();

  const labels = jsonData.map((dataPoint) => dataPoint.year);
  const temperatures = jsonData.map((dataPoint) => dataPoint.temperature);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Temperature Over the Years',
        data: temperatures,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };
};

const WeatherApp = ({ city }) => {
  const [weatherData, setWeatherData] = useState<{
    labels: any;
    datasets: {
      label: string;
      data: any;
      fill: boolean;
      backgroundColor: string;
      borderColor: string;
    }[];
  } | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchHistoricalWeatherData(city);
      setWeatherData(data);
    };

    getData();
  }, [city]);

  return (
    <div>
      <h1>Weather Patterns for {city} Over the Past 20 Years</h1>
      {weatherData && <WeatherGraph data={weatherData} />}
    </div>
  );
};

export default WeatherApp;