# Twitch API React App

This is a small React application that fetches and displays information about predefined Twitch channels. The app allows users to filter channels based on their streaming status (all, online, or offline) and provides additional details about the currently streaming channels.

## Features

1. **User Story: See freeCodeCamp's Streaming Status**

   - The app displays whether freeCodeCamp is currently streaming on Twitch.tv.

2. **User Story: Navigate to Twitch Channels**

   - Users can click on the status output of a channel to be redirected to the respective Twitch.tv channel.

3. **User Story: View Streaming Details**

   - If a Twitch user is currently streaming, the app displays additional details about what they are streaming.

4. **Filter Channels**
   - Users can filter the displayed channels by their status: all, online, or offline.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your system.

### Steps to Set Up and Run the App

1. **Clone the Repository**
   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Himanshu-singh-95/Himanshu-singh-95.git
   cd Twitch-API
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

   By default, the app will run on `http://localhost:3000`.

4. **Build for Production**
   To create a production build, run:

   ```bash
   npm run build
   ```

   The production build will be available in the `build` directory.

5. **Preview the Production Build**
   To preview the production build locally:

   ```bash
   npm run preview
   ```

## Usage

1. **View Twitch Channels**

   - The app displays a list of predefined Twitch channels, including their streaming status.

2. **Filter Channels**

   - Use the "All," "Online," and "Offline" buttons to filter the displayed channels based on their status.

3. **View Streaming Details**

   - For channels that are currently streaming, additional details about the stream (e.g., stream title) are displayed.

4. **Navigate to Twitch**
   - Click on a channel's status to open the respective Twitch.tv channel in a new tab.

## Purpose

The purpose of this app is to demonstrate the integration of the Twitch API with React to fetch and display real-time streaming data. It showcases React state management, filtering functionality, and asynchronous data fetching using `fetch`.

## Technologies Used

- React
- Fetch API for making HTTP requests
- CSS for styling

## File Structure

- `src/App.jsx`: Main component containing the logic for fetching and displaying Twitch channel data.
- `src/ChannelList.jsx`: Component for rendering the list of Twitch channels.
- `src/utils.js`: Utility functions for fetching channel and stream data.
- `src/App.css`: Styles for the application.

## License

This project is licensed under the MIT License.
