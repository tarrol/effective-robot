import React, { useState } from "react";

const ProfileList = ({ userData, setSelectedProfile }) => {


    return (
        <ul>
            {userData.profiles.map(profile => (
                <li
                  key={profile.name}
                  onClick={() => setSelectedProfile(profile.name)}
                >
                  {profile.name}
                </li>
              
              ))}
        </ul>

    )

}

export default ProfileList;