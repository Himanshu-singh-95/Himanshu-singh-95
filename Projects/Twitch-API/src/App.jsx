import React, { useEffect, useState } from 'react';
import './App.css';
import ChannelList from './ChannelList';
import { fetchChannelInfoForChannel } from './utils';

const channels = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
];

/**
 * Main App Component
 *
 * This component fetches and displays a list of Twitch channels with filtering options.
 * It allows users to filter channels based on their status (all, online, or offline).
 *
 * @returns {JSX.Element} The main application component.
 */
export default () => {
  const [channelData, setChannelData] = useState([]);
  const [filter, setFilter] = useState('all');

  /**
   * Fetches channel information for all predefined channels.
   *
   * This function uses the `fetchChannelInfoForChannel` utility to fetch combined
   * stream and channel data for each channel and updates the state with the results.
   */
  useEffect(() => {
    const fetchChannelInfo = async () => {
      const data = await Promise.all(
        channels.map((channel) => fetchChannelInfoForChannel(channel))
      );
      setChannelData(data);
    };

    fetchChannelInfo();
  }, []);

  /**
   * Filters the channel data based on the selected filter.
   *
   * @returns {Array} The filtered list of channels.
   */
  const filteredChannels = channelData.filter((channel) => {
    if (filter === 'all') return true;
    return channel.status === filter;
  });

  return (
    <div className="main">
      <h1>Welcome to the Twitch API project!</h1>

      <div className="container">
        <div className="header">
          <h2>TWITCH STREAMERS</h2>
          <div className="filters">
            <button
              className={`selector ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`selector ${filter === 'online' ? 'active' : ''}`}
              onClick={() => setFilter('online')}
            >
              Online
            </button>
            <button
              className={`selector ${filter === 'offline' ? 'active' : ''}`}
              onClick={() => setFilter('offline')}
            >
              Offline
            </button>
          </div>
        </div>

        <ChannelList channels={filteredChannels} />
      </div>
    </div>
  );
};
