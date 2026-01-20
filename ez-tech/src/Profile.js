import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Profile = ({ currentUser, setSidebarOpen }) => {
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="button"><button onClick={() => setSidebarOpen(true)}>☰</button></div>
      <div className="profile-page-container">
        <h1 className="page-title">Your Profile</h1>
      <div className="profile-card">
        <p><strong>Full Name:</strong> {currentUser.name}</p>
        <p><strong>Email Address:</strong> {currentUser.email}</p>
        <p><strong>Account Password:</strong> {currentUser.pass}</p>
        
        <Link to="/">
          <button style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', color: 'white', background: '#e53935'

          }}>
            Back to Movies
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Profile;