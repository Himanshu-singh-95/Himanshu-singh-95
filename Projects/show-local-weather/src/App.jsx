import React, { useState, useEffect } from 'react';
import './toggle_switch.css';

/**
 * Main component for displaying weather information and toggling temperature units.
 * Fetches weather data based on the user's current location.
 */
export default () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('Celsius');
  const [displayTemp, setDisplayTemp] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Converts temperature between Celsius and Fahrenheit.
   * @param {number} temp - The temperature value to convert.
   * @param {string} unit - The unit to convert the temperature to ('Celsius' or 'Fahrenheit').
   * @returns {number} - The converted temperature.
   */
  const convertTemperature = (temp, unit) => {
    return unit === 'Celsius' ? temp : (temp * 9) / 5 + 32;
  };

  /**
   * Fetches weather data for the user's current location using the browser's geolocation API.
   * Updates the weather, location, and error states based on the API response.
   */
  const getWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`)
          .then((response) => response.json())
          .then((data) => {
            setWeather(data);
            setLocation(`${data.name}, ${data.sys.country}`);
          })
          .catch((err) => {
            console.error('Error fetching weather data:', err);
            setError(err.message || 'Failed to fetch weather data');
          })
          .finally(() => setLoading(false));
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  /**
   * Updates the displayed temperature whenever the weather data or temperature unit changes.
   */
  useEffect(() => {
    if (weather) {
      const temperature = convertTemperature(weather.main.temp, unit);
      setDisplayTemp(temperature);
    }
  }, [weather, unit]);

  /**
   * Toggles the temperature unit between Celsius and Fahrenheit.
   */
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        className="container"
        style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1>Welcome to Free Weather App!</h1>
        <h2>
          Weather in{' '}
          {weather ? (
            <>
              {location}: {displayTemp} {unit === 'Celsius' ? '°C' : '°F'}
              <img
                src={weather.weather[0].icon}
                alt={weather.weather[0].description}
                style={{ width: '50px', height: '50px', marginLeft: '10px' }}
              />
            </>
          ) : null}
        </h2>
        <div>
          <p>Click to see the weather in your current location..</p>
          <button className="btn btn-primary" onClick={getWeather}>
            Get Weather
          </button>
        </div>
        <div>
          <p>Toggle between Fahrenheit and Celsius</p>
          <label className="switch">
            <input type="checkbox" onChange={toggleUnit} checked={unit === 'Fahrenheit'} />
            <span className="slider round"></span>
          </label>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <pre>
          {!loading && weather ? JSON.stringify(weather, null, 2) : 'No weather data available'}
        </pre>
      </div>
    </div>
  );
};
