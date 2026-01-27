import LoginForm from './LoginForm';  
import { Link } from 'react-router-dom'; 

const SidebarContent = ({ 
  loginUser, setLoginUser, 
  loginPass, setLoginPass, 
  setSidebarOpen, 
  currentUser, setCurrentUser,
}) => { 

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginUser("");
    setLoginPass("");
    // REMOVED: setSearchTerm("") - This variable is no longer in this file
    alert("You have logged out");
  };

  return (
    <div className="sidebar-container-inner">
      
      {/* SECTION 1: ACCOUNT */}
      {currentUser ? (
        <div className='sidebar-login-container'>
          <h3>Welcome, {currentUser.name || currentUser.email}!</h3>
          <div className='user-actions'>
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

      {/* FIXED: Removed the extra closing </div> that was here */}

      {/* SECTION 2: FILTERS */}
      <div className="sidebar-checkboxes">
        <label className="sidebar-label">Categories:</label>
        <div className="checkboxes-list">
          <label><input type="checkbox" name="action" value="Action" /> Action</label><br/>
          <label><input type="checkbox" name="comedy" value="Comedy" /> Comedy</label><br/>
          <label><input type="checkbox" name="drama" value="Drama" /> Drama</label><br/>
          <label><input type="checkbox" name="horror" value="Horror" /> Horror</label><br/>
          <label><input type="checkbox" name="sci-fi" value="Sci-Fi" /> Sci-Fi</label>
        </div>
      </div>
      
      {/* SECTION 3: ACTIONS */}
      <div className="sidebar-action">
        <button className="apply-button" onClick={() => setSidebarOpen(false)}>
          Apply Filters
        </button>
        {/* REMOVED: The Clear Search button from here */}
      </div> 

    </div>      
  );
};

export default SidebarContent;