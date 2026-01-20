import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const LoginForm = ({ loginUser, setLoginUser, loginPass, setLoginPass, setSidebarOpen, setCurrentUser }) => {

const handleLogin = async(e) => {
    e.preventDefault();

const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

const foundUser = allUsers.find(user => user.email === loginUser);

  if (foundUser) {
    try {
const isMatch = await bcrypt.compare(loginPass, foundUser.pass);

  if (isMatch) {
    setCurrentUser(foundUser);
    setSidebarOpen(false);
    alert("Login Successful!");
  } else {
    alert("Invalid Password!");
  }
  } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred during login.");
      }
  } else {
      alert("User not found! Please register first.");
    }
  };
return (
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
  <button className="sidebar-login-btn" onClick={handleLogin}>Login</button>
  
 <Link to="/Register" onClick={() => setSidebarOpen(false)} >
  <button className="sidebar-register-btn">Register</button>
 </Link>

      <hr className="sidebar-divider" />
</div>
);
};

export default LoginForm;