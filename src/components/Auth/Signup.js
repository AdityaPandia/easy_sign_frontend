

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setError(""); // Clear previous error
      setSuccess(""); // Clear previous success
      console.log("Attempting to sign up...");
      await axios.post("https://13.60.196.243:5000/api/auth/register", { name, email, password });
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login bfter 2 seconds
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
