import React from 'react';
import './ChannelList.css';

/**
 * ChannelList Component
 *
 * This component renders a list of Twitch channels with their details such as logo, name, game, and description.
 * Each channel is displayed in a row with a flexbox layout, dividing the width into three columns.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.channels - An array of channel objects to display.
 * @param {string} props.channels[].status - The status of the channel (e.g., "online" or "offline").
 * @param {string} props.channels[].logo - The URL of the channel's logo image.
 * @param {string} props.channels[].name - The name of the channel.
 * @param {string} props.channels[].url - The URL of the channel's Twitch page.
 * @param {string} props.channels[].game - The game currently being streamed by the channel.
 * @param {string} [props.channels[].description] - A brief description of the channel or its stream.
 *
 * @returns {JSX.Element} A React component that displays the list of channels.
 */
const ChannelList = ({ channels }) => {
  return (
    <div id="display">
      {channels.map((channel, index) => (
        <div key={index} className={`row ${channel.status}`}>
          <div id="icon">
            <img src={channel.logo} alt={`${channel.name} logo`} className="logo" />
          </div>
          <div id="name">
            <a href={channel.url} target="_blank" rel="noopener noreferrer">
              {channel.name}
            </a>
          </div>
          <div id="streaming">
            {channel.game}
            {channel.description && <span className="hidden-xs">: {channel.description}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
