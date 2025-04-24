# Show Local Weather App

This is a small React application that displays the current weather for the user's location. The app uses the [FreeCodeCamp Weather Proxy API](https://weather-proxy.freecodecamp.rocks/) to fetch weather data and provides the following features:

## Features

1. **User Story: See the weather in the current location**

   - The app uses the browser's geolocation API to fetch the user's latitude and longitude and displays the weather for that location.

2. **User Story: See a different icon depending on the weather**

   - The app dynamically displays a weather icon (e.g., sunny, cloudy, snowy) based on the weather conditions returned by the API.

3. **User Story: Toggle between Fahrenheit and Celsius**
   - The app includes a toggle switch that allows users to switch between Fahrenheit and Celsius for temperature display.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your system.
- A modern web browser that supports geolocation.

### Steps to Set Up and Run the App

1. **Clone the Repository**
   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Himanshu-singh-95/Himanshu-singh-95.git
   cd show-local-weather
   ```

2. **Install Dependencies**
   Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. **Run the Development Server**
   Start the development server:

   ```bash
   npm start
   ```

   By default, the app will run on `http://localhost:5173`.

4. **Build for Production**
   To create a production build, run:

   ```bash
   npm run build
   ```

   The production build will be available in the `dist` directory.

5. **Preview the Production Build**
   To preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Purpose and Usage

### Purpose

The purpose of this app is to demonstrate the integration of geolocation, weather APIs, and React state management to create a simple weather application.

### Usage

The app fetches weather data from the [FreeCodeCamp Weather Proxy API](https://weather-proxy.freecodecamp.rocks/). It uses the `/api/current` endpoint to get the current weather for a specific latitude and longitude.

#### Example API Request

To get the current weather for a location:

```
https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139
```

#### Example API Response

```json
{
  "coord": { "lon": 139, "lat": 35 },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "https://cdn.freecodecamp.org/weather-icons/02n.png"
    }
  ],
  "main": {
    "temp": 25,
    "feels_like": 28.82,
    "temp_min": 25,
    "temp_max": 25,
    "pressure": 1010,
    "humidity": 84
  },
  "name": "Shuzenji",
  "sys": { "country": "JP" }
}
```

### How It Works

1. **Geolocation**: The app uses the browser's geolocation API to get the user's latitude and longitude.
2. **Weather Data**: The app sends a GET request to the `/api/current` endpoint with the user's coordinates to fetch weather data.
3. **Dynamic Icon**: The app displays a weather icon based on the `weather[0].icon` field in the API response.
4. **Temperature Conversion**: The app allows users to toggle between Fahrenheit and Celsius using a toggle switch.

---

## Additional Notes

- **API Limitations**: The FreeCodeCamp Weather Proxy API only supports GET requests and specific endpoints.
- **Supported Cities**: The `/api/city/:city` endpoint only supports New York, Chicago, Los Angeles, Tokyo, and London. For other locations, use the `/api/current` endpoint with latitude and longitude.
- **Icons**: Weather icons are included in the API response under `weather[0].icon`.

---

## Scripts

- `npm start`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build locally.

---

## License

This project is licensed under the MIT License.

## Deploy to GitHub Pages

You can also deploy your project using GitHub pages.
First install the `gh-pages` [package](https://github.com/tschaub/gh-pages):

`npm i -D gh-pages`

Use the following scripts for deployment:

```js
"scripts": {
  "start": "vite",
  "build": "vite build",
  "predeploy": "rm -rf dist && vite build",
  "deploy": "gh-pages -d dist"
},
```

Then follow the normal procedure in GitHub Pages and select the `gh-pages` branch.
