import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css"; // Add custom styles to match the signup page
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // For storing email input
  const [otp, setOtp] = useState(""); // For storing OTP input
  const [newPassword, setNewPassword] = useState(""); // For storing new password
  const [confirmPassword, setConfirmPassword] = useState(""); // For confirming the new password
  const [stage, setStage] = useState(1); // 1: Enter email, 2: Enter OTP, 3: Reset password
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setStage(2); // Move to OTP verification
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted:", otp);
    setStage(3); // Move to password reset stage
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset:", newPassword);
    alert("Your password has been reset successfully!");
    navigate("/"); // Redirect back to login page
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {/* Stage 1: Enter email */}
      {stage === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <label>Enter your email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Stage 2: Enter OTP */}
      {stage === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <label>Enter OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {/* Stage 3: Reset password */}
      {stage === 3 && (
        <form onSubmit={handlePasswordReset}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}

      {/* Link to return to the login page */}
      <p>
        <Link to="/" className="link">
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
