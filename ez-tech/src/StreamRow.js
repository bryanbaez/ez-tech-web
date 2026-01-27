import React, { useRef } from 'react';

const StreamRow = ({ title, movies, allMovies, saveToDatabase, isEditing, setIsEditing, editText, setEditText }) => {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    rowRef.current.scrollLeft += dir === 'left' ? -400 : 400;
  };

  const handleToggle = (id) => {
    const newList = allMovies.map(m => m.id === id ? { ...m, completed: !m.completed } : m);
    saveToDatabase(newList);
  };

  const handleDelete = (id) => {
    const newList = allMovies.filter(m => m.id !== id);
    saveToDatabase(newList);
  };

  return (
    <div className="stream-row-container">
      <h2 className="row-header">{title} ({movies.length})</h2>
      <div className="slider-box">
        <button className="arrow-btn left" onClick={() => scroll('left')}>‹</button>
        <div className="stream-slider" ref={rowRef}>
          {movies.map(movie => (
            <div key={movie.id} className="stream-card">
              <img src={movie.image} alt={movie.text} />
              
              <div className="stream-card-controls">
                <button className="done-btn" onClick={() => handleToggle(movie.id)}>
                  {movie.completed ? "↺" : "✓"}
                </button>
                <button className="del-btn" onClick={() => handleDelete(movie.id)}>✕</button>
              </div>

              <div className="stream-card-info">
                <h4>{movie.text}</h4>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-btn right" onClick={() => scroll('right')}>›</button>
      </div>
    </div>
  );
};

export default StreamRow;