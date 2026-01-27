import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CoLogo from './CoLogo.png';
import { useState } from 'react';
import Sidebar from 'react-sidebar';
import SidebarContent from './SidebarContent';
import Navbar, {  About, Cart } from './Navbar'; 
import Register from './Register';
import Profile from './Profile'; 
import StreamList from './StreamList';
import Movies from './Movies';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [currentUser, setCurrentUser]= useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <div className="app-container"> 
        <Sidebar
          sidebar={
            <SidebarContent 
            currentUser={currentUser}  
            loginUser={loginUser} 
            setLoginUser={setLoginUser} 
            loginPass={loginPass} 
            setLoginPass={setLoginPass} 
            setSidebarOpen={setSidebarOpen} 
            setCurrentUser={setCurrentUser} 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            />
          }
          open={sidebarOpen}
          onSetOpen={setSidebarOpen} 
          styles={{ sidebar: { zIndex: 100, background: "#0C3C4C" } }}
        > 
          

          <div className="sidebar-content-wrapper">
            <div className="app-title">
              <img src={CoLogo} alt="Company Logo" />
            </div>
            <Navbar />

            <div className="routes-container">
              <Routes>    
                <Route path="/" element={<StreamList setSidebarOpen={setSidebarOpen}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              
                />} />
                <Route path="/Movies" element={<Movies setSidebarOpen={setSidebarOpen}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} />} />
                <Route path="/Cart" element={<Cart setSidebarOpen={setSidebarOpen} />} />
                <Route path="/About" element={<About setSidebarOpen={setSidebarOpen} />} />
                <Route path= "/Register" element={<Register setCurrentUser= {setCurrentUser} setSidebarOpen={setSidebarOpen} />} />
                <Route path="/profile" element={<Profile currentUser={currentUser} setSidebarOpen={setSidebarOpen} />} />
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