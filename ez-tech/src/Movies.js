import React, { useState, useEffect } from 'react';
import MovieRow from './MovieRow';
import './App.css';

const Movies = ({ setSidebarOpen, currentUser, setCurrentUser, searchTerm, setSearchTerm }) => {
  const [trending, setTrending] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "1e65bb33636cbdbc6964aefa71e1a9dd";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        if (searchTerm.trim()) {
          // Fetch Search Results
          const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`);
          if (!searchRes.ok) throw new Error(`Search API failed: ${searchRes.status}`);
          const searchData = await searchRes.json();
          setSearchResults(searchData.results || []);
        } else {
          // Fetch Trending
          const trendingRes = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
          if (!trendingRes.ok) throw new Error(`Trending API failed: ${trendingRes.status}`);
          const trendingData = await trendingRes.json();
          setTrending(trendingData.results || []);

          // Fetch Discover
          const discoverRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
          if (!discoverRes.ok) throw new Error(`Discover API failed: ${discoverRes.status}`);
          const discoverData = await discoverRes.json();
          setDiscover(discoverData.results || []);
          setSearchResults([]);
        }

      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load movies. Please check your connection or API key.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchMovies();
    }, 500); // Add debounce to avoid excessive API calls while typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="movies-page-container">
      <header className='top-header'>
        <div className="button">
          <button onClick={() => setSidebarOpen(true)}>☰ Menu</button>
        </div>
        <div className='logo-section'>
          <h1 className="page-title">Explore Cinema</h1>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="search-wrapper">
        <input 
          type="text" 
          placeholder="Search for any movie..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
        <button className="clear-search-btn" onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Fetching latest films...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : (
        <div className="rows-container">
          {searchTerm.trim() ? (
            <MovieRow 
              title={`Results for "${searchTerm}"`}
              movies={searchResults} 
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser} 
            />
          ) : (
            <>
              <MovieRow 
                title="Trending This Week" 
                movies={trending} 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
              />
              
              <MovieRow 
                title="Discover New Favorites" 
                movies={discover} 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;