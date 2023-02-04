import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../utils/mutations";
import { FaUser } from "react-icons/fa";

function Register({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [registerUser, { _error }] = useMutation(REGISTER_USER);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Validate the input values and perform registration here
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // const response = await fetch('<YOUR_REGISTRATION_API_ENDPOINT>', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     username,
      //     email,
      //     password,
      //   }),
      // });

      // const result = await response.json();
      // if (result.success) {
      //   console.log(`Successfully registered user ${username}`);
      //   setError('');
      // } else {
      //   setError(result.error);
      // }
      const { data } = await registerUser({
        variables: { name: username, email: email, password: password },
      });
      setIsLoggedIn(true);
    } catch (error) {
      setError("Error while registering user");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="center">
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className="center">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
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
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password  "
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword"></label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <button className="register-button" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default Register;
