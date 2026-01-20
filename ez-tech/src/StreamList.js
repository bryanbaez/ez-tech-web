import React, { useState, useEffect } from 'react';

const StreamList = ({ setSidebarOpen, currentUser, setCurrentUser, searchTerm }) => {
  const [input, setInput] = useState();
  const [list, setList] = useState(currentUser?.myMovies || []);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

const saveToDatabase = (updatedList) => {
  if (!currentUser){
    alert("please log in to save to you list!")
    return
  }  
  const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
const updatedUsers = allUsers.map(user => {
      if (user.email === currentUser.email) {
        return { ...user, myMovies: updatedList };
      }
      return user;
    });

    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    setList(updatedList);
    setCurrentUser({ ...currentUser, myMovies: updatedList });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
 
    const newItem = { 
      id: Date.now(), 
      text: input, 
      completed: false,
      image: "https://via.placeholder.com/150x225?text=Movie+Poster" 
    };
    
    const newList = [...list, newItem];
    saveToDatabase(newList);
    setInput(""); 
  };

 const handleDelete = (id) => {
    const newList = list.filter(item => item.id !== id); 
    saveToDatabase(newList); 
};

const handleToggleComplete = (id) => {
    const newList = list.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveToDatabase(newList);
};

const startEdit = (item) => {
    setIsEditing(item.id);
    setEditText(item.text);
};

const saveEdit = (id) => {
    const newList = list.map(item => 
      item.id === id ? { ...item, text: editText } : item
    );
    saveToDatabase(newList);
    setIsEditing(null);
};
  const filteredMovies = list.filter((movie) =>
    movie.text.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="streamlist-container">
      <div className="button"><button onClick={() => setSidebarOpen(true)}>☰ Menu</button></div>
      <h1 className="page-title">My StreamList</h1>

      <form onSubmit={handleAdd} className="add-movie-form">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter movie title..." 
          className="sidebar-input-movies"
        />
        <button type="submit" className="apply-button-movies">Add to List</button>
      </form>

      {/* Grid Layout for the Movie Cards */}
      <div className="movie-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px', 
        padding: '20px' 
      }}>
        {filteredMovies.map((item) => (
          <div key={item.id} className="movie-card" style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            overflow: 'hidden',
            textAlign: 'center',
            backgroundColor: item.completed ? '#e0e0e0' : '#fff',
            position: 'relative'
          }}>
            {/* Add fake image*/}
            <img 
              alt={item.text} 
              onClick={() => handleToggleComplete(item.id)}
              style={{ width: '100%', cursor: 'pointer', display: 'block' }}
            />

            <div style={{ padding: '10px' }}>
              {isEditing === item.id ? (
                <>
                  <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <button onClick={() => saveEdit(item.id)}>Save</button>
                </>
              ) : (
                <>
                  <h3 style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                    {item.text}
                  </h3>
                  <div className="card-actions">
                    <button onClick={() => startEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{color: 'red'}}>Delete</button>
                  </div>
                </>
              )}
            </div>
            
            {item.completed && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'green',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '50%'
              }}>✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamList;