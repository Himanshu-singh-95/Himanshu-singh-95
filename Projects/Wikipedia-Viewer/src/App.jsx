import React, { useEffect, useRef } from 'react';
import './App.css';

/**
 * Main component for the Wikipedia Viewer application.
 * Allows users to search Wikipedia articles and navigate to random pages.
 */
export default () => {
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const searchInputRef = useRef(null);

  /**
   * Focuses the search input field when the component mounts.
   */
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  /**
   * Displays an error message when no search results are found.
   * @param {string} keyword - The search keyword that returned no results.
   */
  const showError = (keyword) => {
    setError(`No results found for "${keyword}"`);
    setResults([]);
  };

  /**
   * Updates the state with the search results from the API.
   * @param {Object} data - The data object returned from the Wikipedia API.
   */
  const showResults = (data) => {
    setResults(data.query.search);
  };

  /**
   * Fetches search results from the Wikipedia API based on the user's query.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const getSearchResults = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.target);
    const keyword = formData.get('search-input');
    const MediaWikiAPIURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${keyword}&prop=info&inprop=url&utf8=&format=json&origin=*`;

    fetch(MediaWikiAPIURL, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.query.searchinfo.totalhits === 0) {
          showError(keyword);
        } else {
          showResults(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch search results. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Redirects the user to a random Wikipedia page.
   */
  const handleFeelingLucky = () => {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  };

  return (
    <div className="main">
      <h1 className="heading">Wikipedia Viewer</h1>
      <div className="search-container">
        <form onSubmit={getSearchResults} className="search-form">
          <input
            type="text"
            name="search-input"
            placeholder="Search Wikipedia"
            className="search-input"
            ref={searchInputRef} // Attach the ref to the input
          />
          <div className="button-group">
            <button type="submit" className="search-button search-button_primary">
              Search
            </button>
            <button
              type="button"
              className="search-button search-button_lucky"
              onClick={handleFeelingLucky}
            >
              I'm Feeling Lucky
            </button>
          </div>
        </form>
      </div>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && (
        <ul className="search-results">
          {results.map((result) => (
            <a
              href={`https://en.wikipedia.org/?curid=${result.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
              key={result.pageid}
            >
              <li className="result-item">
                <h1>{result.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
};
