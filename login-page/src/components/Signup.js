import React from "react";
import "./../styles/Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="left-section">
        <h1>Upskill Vision</h1>
      </div>
      <div className="right-section">
        <h1>Create Account</h1>
        <form>
          <div className="name-fields">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit" className="signup-btn">Create Account</button>
        </form>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/")} className="link">Login</span>
        </p>
        <div className="google-login">
          <hr /> or <hr />
        </div>
        <button className="google-btn">
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
