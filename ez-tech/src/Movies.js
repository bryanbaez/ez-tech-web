import React, { useState, useEffect } from 'react';
import MovieRow from './MovieRow';
import './App.css';

const Movies = ({ setSidebarOpen, currentUser, setCurrentUser }) => {
  const [trending, setTrending] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "1e65bb33636cbdbc6964aefa71e1a9dd";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch Trending
        const trendingRes = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        const trendingData = await trendingRes.json();
        setTrending(trendingData.results);

        // Fetch Discover
        const discoverRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
        const discoverData = await discoverRes.json();
        setDiscover(discoverData.results);

        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page-container">
      <header className='top-header'>
        <div className='menu-trigger'></div>
      <div className="button">

        <button onClick={() => setSidebarOpen(true)}>☰ Menu</button>
      </div>
      <div className='logo-section'>

      <h1 className="page-title">Explore Cinema</h1>
      </div>
      <div className='spacer'></div>
      </header>

      {loading ? (
        <p className="loading-text">Loading movies...</p>
      ) : (
        <div className="rows-container">
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
        </div>
      )}
    </div>
  );
};

export default Movies;