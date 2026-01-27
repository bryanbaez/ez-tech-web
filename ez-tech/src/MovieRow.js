import React, { useRef, useState } from 'react';

const MovieRow = ({ title, movies, currentUser, setCurrentUser, isStreamList }) => {
  const [selectedMovie, setSelectedMovie] = useState(null); // Track the clicked movie
  const rowRef = useRef(null);

  const scroll = (direction) => {
    const { current } = rowRef;
    if (!current) return;
    current.scrollLeft += direction === 'left' ? -500 : 500;
  };

  const handleAdd = (e, movie) => {
    e.stopPropagation(); 
    if (!currentUser) return alert("Log in first!");
    
    const newItem = {
      id: movie.id,
      text: movie.title,
      completed: false,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      overview: movie.overview || "No description available", 
      vote_average: movie.vote_average,
      release_date: movie.release_date
    };

    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const updatedList = [...(currentUser.myMovies || []), newItem];
    const updatedUsers = allUsers.map(u => u.email === currentUser.email ? {...u, myMovies: updatedList} : u);
    
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    setCurrentUser({...currentUser, myMovies: updatedList});
    alert(`${movie.title} added!`);
  };

  // Toggle & Delete handlers stay the same, but add e.stopPropagation()
  const handleToggle = (e, id) => {
    e.stopPropagation();
    const updatedList = currentUser.myMovies.map(m => m.id === id ? { ...m, completed: !m.completed } : m);
    saveToStorage(updatedList);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const updatedList = currentUser.myMovies.filter(m => m.id !== id);
    saveToStorage(updatedList);
  };

  const saveToStorage = (updatedList) => {
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const updatedUsers = allUsers.map(u => u.email === currentUser.email ? {...u, myMovies: updatedList} : u);
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    setCurrentUser({...currentUser, myMovies: updatedList});
  };

  return (
    <div className="movie-row-container">
      <h2 className="row-title">{title}</h2>
      
      <div className="slider-wrapper">
        <button className="handle handle-left" onClick={() => scroll('left')}>‹</button>
        
        <div className="movie-slider" ref={rowRef}>
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="slider-card" 
              onClick={() => setSelectedMovie(movie)} 
            >
              <img 
                src={isStreamList ? movie.image : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                alt={movie.title || movie.text} 
              />
              <div className="card-overlay">
                {isStreamList ? (
                  <>
                    <button className="done-btn" onClick={(e) => handleToggle(e, movie.id)}>
                      {movie.completed ? "↺" : "✓"}
                    </button>
                    <button className="del-btn" onClick={(e) => handleDelete(e, movie.id)}>✕</button>
                  </>
                ) : (
                  <button onClick={(e) => handleAdd(e, movie)}>+</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="handle handle-right" onClick={() => scroll('right')}>›</button>
      </div>

      {/* --- TMDB INFORMATION MODAL --- */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedMovie(null)}>✕</button>
            
            <div className="modal-body">
              <img 
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path || selectedMovie.image.replace('https://image.tmdb.org/t/p/w500', '')}`} 
                alt={selectedMovie.title} 
                className="modal-poster"
              />
              <div className="modal-info">
                <h2>{selectedMovie.title || selectedMovie.text}</h2>
                <div className="modal-meta">
                  <span>⭐ {selectedMovie.vote_average || "N/A"} / 10</span>
                  <span>📅 {selectedMovie.release_date || "Unknown"}</span>
                </div>
                <p className="modal-overview">
                  {selectedMovie.overview || (isStreamList ? "Description missing. Please remove and re-add this movie." : "No description available.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRow;