// SignUp.js
import React, { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // Store user credentials in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Sign up successful. You can now login.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
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
      <button onClick={handleSignUp} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
