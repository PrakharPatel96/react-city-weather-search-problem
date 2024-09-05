import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const data = {
    'New York': { temperature: '22°C', humidity: '56%', windSpeed: '15 km/h' },
    'Los Angeles': {
      temperature: '27°C',
      humidity: '45%',
      windSpeed: '10 km/h',
    },
    London: { temperature: '15°C', humidity: '70%', windSpeed: '20 km/h' },
  };

  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [isCityFound, setIsCityFound] = useState(false);

  const setCityValues = () => {
    return Object.entries(data).map(([key, value]) => {
      return {
        city: key,
        value: value,
      };
    });
  };

  const insertValues = (cityName) => {
    let filteredCity = cities.find((item) => item.city === cityName);
    setSelectedCities((prev) => {
      if (!prev.some((item) => item.city === cityName)) {
        return [...prev, filteredCity];
      } else {
        return prev;
      }
    });
  };

  const handleSearch = () => {
    let isFound = false;
    let searchedCity = '';
    cities.forEach((item) => {
      if (item.city === cityName) {
        isFound = true;
        searchedCity = item.city;
      }
    });
    if (isFound) {
      insertValues(searchedCity);
      setIsCityFound(false);
    } else {
      setIsCityFound(true);
    }
  };

  useEffect(() => {
    const transformedCities = setCityValues();
    setCities(transformedCities);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the city name"
        onChange={(e) => {
          setCityName(e.target.value.trim());
        }}
      />
      <button onClick={() => handleSearch()}>Search</button>
      {isCityFound && <h3>City Not Found!</h3>}
      {selectedCities?.map((item) => {
        return (
          <ul>
            <p>{item?.city}:</p>
            <li>Temperature: {item?.value?.temperature}</li>
            <li>Humidity: {item?.value?.humidity}</li>
            <li>WindSpeed: {item?.value?.windSpeed}</li>
          </ul>
        );
      })}
    </div>
  );
}
