

// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Auth.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleLogin = async () => {
//     try {
//       setError(""); // Clear previous error
//       setSuccess(""); // Clear previous success
//       console.log("Attempting to log in...");
//       const response = await axios.post("https://easy-sign-backend.vercel.app/api/auth/login", { email, password });
//       console.log("Login successful:", response.data);
//       setSuccess("Login successful!"); // Update success message
//       // Handle token storage here (e.g., localStorage)
//     } catch (err) {
//       console.error("Login failed:", err.response?.data?.error || err.message);
//       setError(err.response?.data?.error || "An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Login</h2>
//         {error && <p className="auth-error">{error}</p>}
//         {success && <p className="auth-success">{success}</p>}
//         <div className="auth-form">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleLogin}>Login</button>
//         </div>
//         <p>
//           Don't have an account? <Link to="/signup">Sign up here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

//






import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogin = async () => {
    try {
      setError(""); // Clear previous error
      setSuccess(""); // Clear previous success
      console.log("Attempting to log in...");
      const response = await axios.post("https://easy-sign-backend.vercel.app/api/auth/login", { email, password });
      console.log("Login successful:", response.data);
      setSuccess("Login successful!"); // Update success message

      // Handle token storage here (e.g., localStorage)
      localStorage.setItem("authToken", response.data.token); // Store the token in localStorage or sessionStorage

      // Navigate to the Dashboard after login
      console.log("calling dashboard");
      navigate("/dashboard"); // Redirect to dashboard after successful login
      console.log("dashboard called");

    } catch (err) {
      console.error("Login failed:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
        <div className="auth-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


