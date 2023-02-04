import React, { useState, useEffect } from "react";
import { QUERY_ME } from "../../utils/queries"
import { CREATE_PROFILE } from "../../utils/mutations";
import { useMutation, useQuery } from '@apollo/client';
import ProfileList from "../components/ProfileList";

const LoginPage = ({ isLoggedIn }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { loading, data: userData, refetch: refetchUser } = useQuery(QUERY_ME);
  // setProfiles(userData?.profiles || [] );

  const GetProfiles = () => {
    refetchUser();
    // setProfiles(userData?.profiles || [] );
  }
  const [CreateProfile, { error }] = useMutation(CREATE_PROFILE);


  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  const handleCreateProfile = async (profileName) => {
    const newProfiles = await CreateProfile({
      variables: {
        id: userData.me._id,
        name: profileName
      },
    });
    GetProfiles();
    // setProfiles([...profiles, { name: profileName, isLoggedIn: false }]);
    // setSelectedProfile(newProfiles.);
    // setSelectedProfile(newProfiles[newProfiles.length - 1]);
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

  // const handleMakeAdmin = (profileName) => {
  //   const updatedProfiles = profiles.map(profile => {
  //     if (profile.name === profileName) {
  //       profile.isAdmin = true;
  //     } else {
  //       profile.isAdmin = false;
  //     }
  //     return profile;
  //   });
  //   setProfiles(updatedProfiles);
  //   setIsAdmin(true);
  // };

  // if (!isLoggedIn) {
  //   return (
  //     <div>
  //       <h1>Please login</h1>
  //       <button onClick={handleLogin}>Login</button>
  //     </div>
  //   );
  // }

  if (!selectedProfile) {
    // Name, completed Chores, and Rewards box, switch profile option
    return (
      <div>
        <h1>Select or create a profile</h1>
        
          { loading ? (
            <div>Loading...</div>
          ) : (
            userData.me.profiles ? (
              <ProfileList 
              userData={userData.me} 
              setSelectedProfile={setSelectedProfile} 
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
            }
          }}
        />
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

return (
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
                <button /*onClick={() => handleMakeAdmin(profile.name)}*/>
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