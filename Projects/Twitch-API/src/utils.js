/**
 * Constructs a Twitch API URL for the given type and channel name.
 *
 * @param {string} type - The type of API endpoint (e.g., "streams", "channels").
 * @param {string} name - The name of the channel.
 * @returns {string} The constructed API URL.
 */
export const makeURL = (type, name) =>
  `https://twitch-proxy.freecodecamp.rocks/twitch-api/${type}/${name}`;

/**
 * Fetches stream data for a given channel.
 *
 * @param {string} channel - The name of the channel.
 * @returns {Promise<Object>} A promise that resolves to an object containing the stream's game and status.
 * - If the stream is offline, returns `{ game: 'Offline', status: 'offline' }`.
 * - If the account is closed, returns `{ game: 'Account Closed', status: 'offline' }`.
 * - If the stream is online, returns `{ game: <game_name>, status: 'online' }`.
 */
export const fetchStreamData = async (channel) => {
  const response = await fetch(makeURL('streams', channel));
  const data = await response.json();

  if (data.stream === null) {
    return { game: 'Offline', status: 'offline' };
  } else if (data.stream === undefined) {
    return { game: 'Account Closed', status: 'offline' };
  } else {
    return { game: data.stream.game, status: 'online' };
  }
};

/**
 * Fetches channel data for a given channel.
 *
 * @param {string} channel - The name of the channel.
 * @returns {Promise<Object>} A promise that resolves to an object containing the channel's details:
 * - `logo`: The URL of the channel's logo (default placeholder if not available).
 * - `name`: The display name of the channel.
 * - `url`: The URL of the channel's Twitch page.
 * - `description`: The channel's status or description (empty string if not available).
 */
export const fetchChannelData = async (channel) => {
  const response = await fetch(makeURL('channels', channel));
  const data = await response.json();

  return {
    logo: data.logo || 'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F',
    name: data.display_name || channel,
    url: data.url,
    description: data.status || '',
  };
};

/**
 * Fetches combined stream and channel data for a given channel.
 *
 * @param {string} channel - The name of the channel.
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 * - `logo`: The URL of the channel's logo.
 * - `name`: The display name of the channel.
 * - `url`: The URL of the channel's Twitch page.
 * - `game`: The game currently being streamed or "Offline"/"Account Closed".
 * - `status`: The stream's status ("online" or "offline").
 * - `description`: The channel's description if online, otherwise an empty string.
 */
export const fetchChannelInfoForChannel = async (channel) => {
  const streamData = await fetchStreamData(channel);
  const channelData = await fetchChannelData(channel);

  return {
    ...channelData,
    game: streamData.game,
    status: streamData.status,
    description: streamData.status === 'online' ? channelData.description : '',
  };
};
