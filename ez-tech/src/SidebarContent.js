import LoginForm from './LoginForm';  
import { Link } from 'react-router-dom'; 

const SidebarContent = ({ 
  loginUser, setLoginUser, 
  loginPass, setLoginPass, 
  setSidebarOpen, 
  currentUser, setCurrentUser,
  searchTerm, setSearchTerm // 1. Added these props
}) => { 

  const handleLogout = () => {
    setCurrentUser(null);
    setSearchTerm(""); // Clear search on logout for security
    alert("You have logged out");
  };

  return (
    <div className="sidebar-container-inner">
      
      {/* SECTION 1: SEARCH (Always visible) */}
      


      {/* SECTION 2: USER AUTHENTICATION */}
      {currentUser ? (
        <div className='sidebar-login-btn'>
          <h3>Welcome, {currentUser.name || currentUser.email}!</h3>
          <div className='user-actions' style={{ display: 'flex', gap: '10px' }}>
            <Link to="/profile" onClick={() => setSidebarOpen(false)}>
              <button className="sidebar-profile-btn">View Profile</button>
            </Link>
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              Logout
            </button> 
          </div>
        </div>
      ) : (
        <LoginForm
          loginUser={loginUser}
          setLoginUser={setLoginUser}
          loginPass={loginPass}
          setLoginPass={setLoginPass}
          setSidebarOpen={setSidebarOpen}
          setCurrentUser={setCurrentUser}
        /> 
      )}

<div className="sidebar-groups">
        <label htmlFor="movie-search">Search Your Movies</label>
        <input 
          type="text" 
          id="movie-search" 
          placeholder="Type to filter..." 
          value={searchTerm} // 2. Connected to state
          onChange={(e) => setSearchTerm(e.target.value)} // 3. Connected to state
          className="sidebar-input"
        />
      </div>
      <div className="sidebar-checkboxes" style={{ marginTop: '20px' }}>
        <label>Categories:</label>
        <div className="checkboxes-list">
          <label><input type="checkbox" name="action" value="Action" /> Action</label>
          <label><input type="checkbox" name="comedy" value="Comedy" /> Comedy</label>
          <label><input type="checkbox" name="drama" value="Drama" /> Drama</label>
          <label><input type="checkbox" name="horror" value="Horror" /> Horror</label>
          <label><input type="checkbox" name="sci-fi" value="Sci-Fi" /> Sci-Fi</label>
        </div>
      </div>
      
      <div className="sidebar-action" style={{ marginTop: '20px' }}>
        <button className="apply-button" onClick={() => setSidebarOpen(false)}>
          Apply Filters
        </button>
        <button className="clear-button" onClick={() => setSearchTerm("")}>
          Clear Search
        </button>
      </div> 
    </div>      
  );
};

export default SidebarContent;