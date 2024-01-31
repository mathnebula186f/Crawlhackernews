import React, { useState } from "react";
import Signup from "./SignUp";
import Login from "./Login";
import NewsList from "./NewsList";

const Authentication = () => {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser")
  );

  const handleSignup = (userData) => {
    // Here you would typically make an API call to register the user
    // For this example, we'll just log the data
    console.log("Signed up:", userData);
  };

  const handleLogin = (username) => {
    // Set the logged-in user
    setLoggedInUser(username);
  };

  return (
    <div>
      {!loggedInUser ? (
        <div className="flex justify-center items-center h-screen">
          <Signup onSignup={handleSignup} />
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <NewsList setLoggedInUser={setLoggedInUser} />
      )}
    </div>
  );
};

export default Authentication;
