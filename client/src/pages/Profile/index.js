import React, { useState, useEffect } from "react";

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleCreateProfile = (profileName) => {
    setProfiles([...profiles, { name: profileName, isLoggedIn: false }]);
    setSelectedProfile(profileName);
  };

  const handleSelectProfile = (profileName) => {
    const updatedProfiles = profiles.map(profile => {
      if (profile.name === profileName) {
        profile.isLoggedIn = true;
      } else {
        profile.isLoggedIn = false;
      }
      return profile;
    });
    setProfiles(updatedProfiles);
    setSelectedProfile(profileName);
  };

  const handleMakeAdmin = (profileName) => {
    const updatedProfiles = profiles.map(profile => {
      if (profile.name === profileName) {
        profile.isAdmin = true;
      } else {
        profile.isAdmin = false;
      }
      return profile;
    });
    setProfiles(updatedProfiles);
    setIsAdmin(true);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Please login</h1>
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  if (!selectedProfile) {
    return (
      <div>
        <h1>Select or create a profile</h1>
        <ul>
          {profiles.map(profile => (
            <li
              key={profile.name}
              onClick={() => handleSelectProfile(profile.name)}
            >
              {profile.name}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Enter profile name"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleCreateProfile(event.target.value);
            }
          }}
        />
      </div>
    );
  }

  const selectedProfileObject = profiles.find(
    profile => profile.name === selectedProfile
  );

  if (!selectedProfileObject.isLoggedIn) {
    return (
      <div>
        <h1>Please login to profile: {selectedProfile}</h1>
        <button
          onClick={() => {
            const updatedProfiles = profiles.map(profile => {
              if (profile.name === selectedProfile) {
                profile.isLoggedIn = true;
              }
              return profile;
            });
            setProfiles(updatedProfiles);
          }}
        >
          Login
        </button>
      </div>
 );
  }

return (
  <div>
    <h1>Welcome to the Chores Game, {selectedProfile}</h1>
    {selectedProfileObject.isAdmin ? (
      <div>
        <h2>Admin controls</h2>
        <ul>
          {profiles.map(profile => (
            <li key={profile.name}>
              {profile.name}
              {!profile.isAdmin ? (
                <button onClick={() => handleMakeAdmin(profile.name)}>
                  Make admin
                </button>
              ) : (
                <span> - Admin</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <h2>Enjoy the game!</h2>
      </div>
    )}
  </div>
);
};

export default LoginPage;