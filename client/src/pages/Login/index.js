import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate the input values and perform authentication here
    if (username !== "admin" || password !== "password") {
      setError("Incorrect information");
    } else {
      console.log(`Username: ${username}, Password: ${password}`);
      setError("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="center login-page">
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="center">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to continue</p>
      </div>
      <div className="form-group">
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Enter your username  "
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter your password "
          onChange={handlePasswordChange}
        />
      </div>
      <button className="login-button" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
