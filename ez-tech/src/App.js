import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CoLogo from './CoLogo.png';
import React, { useState } from 'react';
import Sidebar from 'react-sidebar';

const Home = ({setSidebarOpen}) =>
  <div> 
      <div className = "button">
        <button onClick={() => setSidebarOpen(true)} >☰</button>
      </div>
    <h1 className="page-title">Home</h1>
  </div>

const Movies = ({setSidebarOpen}) => 
  <div>
    <div className = "button">
      <button onClick={() => setSidebarOpen(true)}>☰</button>
    </div>
  <h1 className="page-title">Movies</h1>
  </div>
const About = ({setSidebarOpen}) => 
  <div>
    <div className = "button">
      <button onClick={() => setSidebarOpen(true)} >☰</button>
    </div>
    <h1 className="page-title">About</h1>
  </div>

const Cart = ({setSidebarOpen}) => 
  <div>
    <div className = "button">
      <button onClick={() => setSidebarOpen(true)} >☰</button>
    </div>
  <h1 className="page-title">Cart</h1>
  </div>


function App() {
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  
  return (
    <BrowserRouter>
      <div className="app-title">
        <img src={CoLogo} alt="Company Logo" />
      </div>
    
    {/* side bar container */} 
   <div className="app-container"> 
   
   <Sidebar
      sidebar={
      
      <div className="sidebar-container-inner">
    
    {/* Side bar login section */}
      <div className="sidebar-login">
        <h3>User Login</h3>
        <input 
          type="text" 
          placeholder="Email" 
          value={loginUser}
          onChange={(e) => setLoginUser(e.target.value)} 
          className="sidebar-input"
        />
      <input 
        type="password" 
        placeholder="Password" 
        value={loginPass}
        onChange={(e) => setLoginPass(e.target.value)}
        className="sidebar-input"
      />
      <button className="sidebar-login-btn">Login</button>
      <hr className="sidebar-divider" />
      </div>

        <div className= "sidebar-groups">
          <label htmlFor= "movie-genere">Search Movies</label>
          <input type="text" id="movie-genere" name="movie-genere" placeholder="Search..."/>
        </div>
        
    {/* Side bar check boxes for movie categories */}
        <div className= "sidebar-checkboxes">
          <label> Categories:</label>
          <div className="checkboxes-list">
            <label>
              <input type="checkbox" name="action" value="Action" />
              Action
            </label>
            <label>
              <input type="checkbox" name="comedy" value="Comedy" />
              Comedy
            </label>
            <label>
              <input type="checkbox" name="drama" value="Drama" />
              Drama
            </label>
            <label>
              <input type="checkbox" name="horror" value="Horror" />
              Horror
            </label>
            <label>
              <input type="checkbox" name="sci-fi" value="Sci-Fi" />
              Sci-Fi
            </label>
          </div>
        </div>
        
        
    { /* Apply button for side bar filters */}
        <div className="sidebar-action">
          <button className="apply-button" onClick ={() => setSidebarOpen(false)} style={{ backgroundColor: '#E53935', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Apply Filters
          </button>
        <button className="clear-button" style={{ backgroundColor: '#E53935', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Clear All  
          </button>
        </div>  
      </div>      
          }  
      open={sidebarOpen}
      onSetOpen={setSidebarOpen}
      
    >
      <div className="sidebar-content-wrapper">
        <nav className="navbar">
          <Link to="/" className="nav-link">HOME
            <span className="glyphicon glyphicon-home"></span>
          </Link>
          <Link to="/Movies" className="nav-link">MOVIES
            <span className="glyphicon glyphicon-film"></span>
          </Link>
          <Link to="/About" className="nav-link">ABOUT
            <span className="glyphicon glyphicon-info-sign"></span>
          </Link>
          <Link to="/Cart" className="nav-link">CART
            <span className="glyphicon glyphicon-shopping-cart"></span>
          </Link>
          
        </nav>
 

        <div className="routes-container">
          <Routes>    
            
            <Route path="/" element={<Home setSidebarOpen={setSidebarOpen} />} />
            <Route path="/Movies" element={<Movies setSidebarOpen={setSidebarOpen} />} />
            <Route path="/Cart" element={<Cart setSidebarOpen={setSidebarOpen} />} />
            <Route path="/About" element={<About setSidebarOpen={setSidebarOpen} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Sidebar>
  </div>
    </BrowserRouter>
  );
}


function Footer() {
  return <footer className="Footer"> 2026 EZ-Tech. All rights reserved.</footer>;
}

export default App;
