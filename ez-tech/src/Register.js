import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Register = ({setCurrentUser, setSidebarOpen}) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");



    const validatePassword = (password) => {
    
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                
                return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
         
        if (!validatePassword(pass)) {
            alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }
        if (pass !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }
        try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass,salt);
        
    
        const fullName = firstname + " " + lastname;
const newUserData ={

    email:email,
    name: fullName,
    pass: hashedPassword
};
const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
const userExists = existingUsers.find(user => user.email === email);
    if (userExists) {
        alert("This email is already registered!");
        return;
    }

    existingUsers.push(newUserData);
    localStorage.setItem("allUsers", JSON.stringify(existingUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUserData));

    setCurrentUser(newUserData);
    alert('Account created for ' + fullName + '!');
    navigate("/");
    } catch (error){
    console.error("Error during registration", error);
    alert("Something went wrong with the registration.")
    }
};
    return (
        
        <div>
            <div className="button"><button onClick={() => setSidebarOpen(true)}>☰</button></div>
            <div className="sidebar-container">
            
            <h1 className ="page-title">Register</h1>
            <form onSubmit={handleRegister} className="register-form">
                
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor='firstname'>First Name:</label>
                        <input
                            type="text" 
                            placeholder="First Name" 
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)} 
                            className="sidebar-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='lastname'>Last Name:</label>
                        <input
                            type="text" 
                            placeholder="Last Name" 
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)} 
                            className="sidebar-input"
                        />
                    </div>
                </div>

                <label htmlFor="email">Please enter your email: </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="sidebar-input"
                    />
                <label htmlFor="password">Please enter your password: </label>
                    <input
                        id= "pass"
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className="sidebar-input"
                    />
                <label htmlFor="confirmPassword">Please confirm your password: </label>
                    <input
                        id = "confirmPass"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="sidebar-input"
                    />
                <button type="submit" className="sidebar-register-btn-page">Register</button>
            
            </form>
        </div>
        </div>
    );
};

export default Register;