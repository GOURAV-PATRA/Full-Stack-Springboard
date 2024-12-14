import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import "../styles/Login.css"; 
import illustration from "../assets/login-illustration.png"; // Add illustration image

const Login = () => {
  const [role, setRole] = useState(""); // Manage role state
  const navigate = useNavigate(); // Handle navigation between pages

  const handleRoleChange = (e) => {
    setRole(e.target.value); // Update role state when a user selects a role
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Login Submitted:", { role }); // Print role for testing (authentication logic here)
  };

  return (
    <div className="login-container">
      {/* Left section with illustration and heading */}
      <div className="left-section">
        <h1 className="brand-title">Upskill Vision</h1> {/* Heading, black color, top-left */}
        <img src={illustration} alt="Illustration" className="login-image" /> {/* Illustration image */}
      </div>

      {/* Right section with form and buttons */}
      <div className="right-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Role selection dropdown */}
          <label>Role</label>
          <select value={role} onChange={handleRoleChange} className="input-field dropdown" required>
            <option value="" disabled>Please Select</option>
            <option value="HR Admin">HR Admin</option>
            <option value="Instructor">Instructor</option>
            <option value="Manager">Manager</option>
            <option value="Participant">Participant</option>
          </select>

          {/* Email input field */}
          <label>Email</label>
          <input type="email" placeholder="Enter your email" className="input-field" required />

          {/* Password input field */}
          <label>Password</label>
          <input type="password" placeholder="Enter your password" className="input-field" required />

          {/* Submit button */}
          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* Forgot password link */}
        <p className="forgot-password">
  <span onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
</p>



        {/* Google login section */}
        <div className="google-login">
          <hr /> or <hr />
        </div>
        <button className="google-btn">
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
          Sign in with Google
        </button>
        

        <p className="create-account">
  Don't have an account?{" "}
  <span onClick={() => navigate("/signup")} className="no-link">
    SignUp
  </span>
</p>

      </div>
    </div>
  );
};

export default Login; // Export Login component to use in other parts of the app
