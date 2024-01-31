// Login.js
import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Check user credentials (for demonstration purpose, using hardcoded values)
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("loggedInUser", username); // Set logged-in user
      onLogin(username);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-64"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Login
      </button>
    </div>
  );
};

export default Login;
