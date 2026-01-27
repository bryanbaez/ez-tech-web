import React, { useState } from 'react';
import MovieRow from './MovieRow'; // Reusing the same carousel component
import './App.css';

const StreamList = ({ setSidebarOpen, currentUser, setCurrentUser, searchTerm, setSearchTerm }) => {
  const movies = currentUser?.myMovies || [];

  // 1. Separate your movies into "To Watch" and "Watched"
  // Also applies your search filter to both rows
  const toWatch = movies.filter(m => !m.completed && m.text.toLowerCase().includes(searchTerm.toLowerCase()));
  const watched = movies.filter(m => m.completed && m.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="movies-page-container streamlist-page">
      <div className="button">
        <button onClick={() => setSidebarOpen(true)}>☰ Menu</button>
      </div>
      
      <h1 className="page-title">Added List</h1>

      {/* SEARCH BAR */}
      <div className="search-wrapper">
        <input 
          type="text" 
          placeholder="Search your list..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
        <button className="clear-search-btn" onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      <div className="rows-container">
        {/* ROW 1: TO WATCH */}
        <MovieRow 
          title="To Watch" 
          movies={toWatch} 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser}
          isStreamList={true} // A flag to tell the row to show 'Delete/Done' instead of 'Add'
        />
        
        {/* ROW 2: WATCHED */}
        <MovieRow 
          title="Already Watched" 
          movies={watched} 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser}
          isStreamList={true}
        />
      </div>

      {movies.length === 0 && (
        <p className="empty-msg">Your list is empty. Go to Discover to add some movies!</p>
      )}
    </div>
  );
};

export default StreamList;