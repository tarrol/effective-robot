import React, { useState, useEffect } from "react";
import { QUERY_ME, QUERY_GETADMIN } from "../../utils/queries"
import { CREATE_PROFILE, SET_ADMIN, SET_PIN } from "../../utils/mutations";
import { useMutation, useQuery } from '@apollo/client';
import ProfileList from "../components/ProfileList";

const LoginPage = ({ isLoggedIn }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formName, setFormName] = useState("");
  const [formPIN, setFormPIN] = useState("");

  const { loading, data: userData, refetch: refetchUser } = useQuery(QUERY_ME);
  const { data: adminName, refetch: refetchAdmin } = useQuery(QUERY_GETADMIN);

  const GetProfiles = () => {
    refetchUser();
    refetchAdmin();

  }
  const [CreateProfile, { error }] = useMutation(CREATE_PROFILE);
  const [SetAdmin, { error: adminError }] = useMutation(SET_ADMIN);
  const [SetPin, { error: pinError }] = useMutation(SET_PIN);

  const SelectProfile = (name) => {
    setSelectedProfile(name);
  }


  const handleCreateProfile = async (profileName) => {
    const newProfiles = await CreateProfile({
      variables: {
        id: userData.me._id,
        name: profileName
      },
    });
    GetProfiles();
    setSelectedProfile(newProfiles.data.createProfile.profiles[
      newProfiles.data.createProfile.profiles.length - 1].name);
  };

  // const handleSelectProfile = (profileName) => {
  //   const updatedProfiles = profiles.map(profile => {
  //     if (profile.name === profileName) {
  //       profile.isLoggedIn = true;
  //     } else {
  //       profile.isLoggedIn = false;
  //     }
  //     return profile;
  //   });
  //   setProfiles(updatedProfiles);
  //   setSelectedProfile(profileName);
  // };

  const handleMakeAdmin = async (profileName) => {
    await SetAdmin({
      variables: {
        id: userData.me._id,
        name: profileName
      }
    });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Please login</h1>
      </div>
    );
  }

  const handleNameChange = (e) => {
    const { value } = e.target;
    setFormName(value);
  };
  const handlePINChange = (e) => {
    const { value } = e.target;
    setFormPIN(value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    await CreateProfile({
      variables: {
        id: userData.me._id,
        name: formName
      },
    });
    
    await SetAdmin({
      variables: {
        id: userData.me._id,
        name: formName
      }
    });

    await SetPin({
      variables: {
        id: userData.me._id,
        pin: formPIN
      }
    });

    setSelectedProfile(formName);
    setIsAdmin(true);
    GetProfiles();
  };


  if (loading)
  {
    return (
      <div>loading</div>
    );
  }
  if (!userData.me)
  {
    return (
      <div>no user data</div>
    );
  }

  if (!selectedProfile) {
    if (userData.me && userData.me.profiles.length > 0) {
      return (
        <div>
          <h1>Select or create a profile</h1>
            { loading ? (
              <div>Loading...</div>
            ) : (
              userData.me.profiles ? (
                <ProfileList 
                userData={userData.me} 
                setSelectedProfile={SelectProfile} 
                />
              ) : (
                <div></div>
              )
            )}
          
          <input
            type="text"
            placeholder="Enter profile name"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleCreateProfile(event.target.value);
                event.target.value="";
              }
            }}
          />
        </div>
      );

    } else {
      return (
        <div>
          <h1>To begin, create a new profile</h1>
          <p>This profile will have administrative permissions. This can be changed later</p>
          <form>
            <h2>Profile Name</h2>
            <input 
              type="text"
              placeholder="Enter profile name"
              value={formName}
              onChange={handleNameChange}
            />
            <h2>Set PIN</h2>
            <p>This pin number will be used to login to the Admin account as well as create chore lists within the game.</p>
            <input 
              type="text"
              placeholder="Enter a 4 digit PIN."
              value={formPIN}
              onChange={handlePINChange}
            />
            <button type="submit" onClick={handleFormSubmit}></button>
          </form>
        </div>
      )
    }
    
  } else {

    return (
      // users name, completed previously, and coins, and way to change profile
      <div>
        <h1>Welcome to the Chores Game, {selectedProfile}</h1>
        {selectedProfile.isAdmin ? (
          <div>
            <h2>Admin controls</h2>
            <ul>
              {userData.profiles.map(profile => (
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

  }

//   const selectedProfileObject = profiles.find(
//     profile => profile.name === selectedProfile
//   );

//   if (!selectedProfileObject.isLoggedIn) {
//     return (
//       <div>
//         <h1>Please login to profile: {selectedProfile}</h1>
//         <button
//           onClick={() => {
//             const updatedProfiles = profiles.map(profile => {
//               if (profile.name === selectedProfile) {
//                 profile.isLoggedIn = true;
//               }
//               return profile;
//             });
//             setProfiles(updatedProfiles);
//           }}
//         >
//           Login
//         </button>
//       </div>
//  );
//   }

};

export default LoginPage;