import React, { useState, useEffect } from 'react';

const featuredMovies = [
  { id: 1, title: "Interstellar", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800", description: "A team of explorers travel through a wormhole in space." },
  { id: 2, title: "The Dark Knight", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800", description: "Batman faces his greatest psychological and physical test." },
  { id: 3, title: "Inception", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800", description: "A thief who steals corporate secrets through dream-sharing technology." }
];

const FeaturedCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // IT Logic: Setup a 10-second interval
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    }, 10000); // 10,000ms = 10 seconds

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  const currentMovie = featuredMovies[index];

  return (
    <div className="carousel-container" >
      <img 
        src={currentMovie.image} 
        alt={currentMovie.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }}
      />
      <div className="carousel-overlay" style={{
        position: 'absolute',
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        width: '100%',
        padding: '20px'
      }}>
        <h2>{currentMovie.title}</h2>
        <p>{currentMovie.description}</p>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
