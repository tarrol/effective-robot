import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FaSignInAlt } from "react-icons/fa";
import { LOGIN_USER } from "../../utils/mutations";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loginUser, { data }] = useMutation(LOGIN_USER);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Validate the input values and perform authentication using the mutation
    try {
      const { data } = await loginUser({
        variables: { email: username, password }
      });
      localStorage.setItem("token", data.login.token);
      setError("");
      setSuccess("Login Successful!");
      setIsLoggedIn(true);
    } catch (error) {
      setError("Incorrect email or password");
      setSuccess("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="center login-page">
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
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
          placeholder="Enter your email address"
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter your password"
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
