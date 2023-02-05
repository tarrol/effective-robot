import React, { useState } from "react";

const ProfileList = ({ userData, setSelectedProfile, isAdmin, handleMakeAdmin }) => {


    return (
      <div>
        { isAdmin ? (
          <h2>Admin Controls</h2>
        ) : (
          <div></div>
        ) }
        <ul>
            {userData.profiles.map(profile => (
                <li key={profile.name}>
                  <span
                    key={profile.name}
                    onClick={() => setSelectedProfile(profile.name)}
                  >{profile.name} </span>
                  
                  { isAdmin ? (
                    <a onClick={() => handleMakeAdmin(profile.name)} >
                      Make this Profile Admin
                    </a>
                  ) : (
                    <div></div>
                  )}
                </li>
              
              ))}
        </ul>
      </div>
        

    )

}

export default ProfileList;