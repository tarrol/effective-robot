import React, { useState, useEffect } from "react";
import { QUERY_MYLISTS, QUERY_ME } from "../../utils/queries";
import { CREATE_LIST, CREATE_CHORE, UPDATE_CHORE } from "../../utils/choreMutations";
import { UPDATE_PROFILE_POINTS } from "../../utils/mutations";
import axios from 'axios';
import { useQuery, useMutation } from "@apollo/client";

const ProtectedPage = ({ isLoggedIn, selectedProfile, isAdmin }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [selectedList, setList] = useState(null);

  const [gptMessage, setGPTMessage] = useState(null);

  const [formListName, setListName] = useState("");
  const [formListTheme, setListTheme] = useState("");
  const [formChoreName, setChoreName] = useState("");
  const [formChoreDesc, setChoreDesc] = useState("");
  const [formChorePoints, setChorePoints] = useState("");

  const [CreateList] = useMutation(CREATE_LIST);
  const [CreateChore] = useMutation(CREATE_CHORE);
  const [UpdateChore] = useMutation(UPDATE_CHORE);
  const [UpdateProfilePoints] = useMutation(UPDATE_PROFILE_POINTS);

  const { data: userData, refetch: refetchUser } = useQuery(QUERY_ME);
  const id = userData?.me._id;
  const { loading, data: listData, refetch: refetchList } 
    = useQuery(QUERY_MYLISTS, { variables: { id } } );


  const GetProfilePoints = (name) => {
    if (!userData.me) {
      return "";
    }
    for (let i = 0; i < userData.me.profiles.length; i++) {
      if (userData.me.profiles[i].name == name)
      {
        return userData.me.profiles[i].points;
      }
    }
    return "";
  }

  const ShowFlavor = (text) => {
    setGPTMessage(text);
  }

  const HandleListSelect = (listName, index) => {
    setList({'listName': listName, 'index': index});
  };
  const handleListNameChange = (e) => {
    const { value } = e.target;
    setListName(value);
  };
  const handleListThemeChange = (e) => {
    const { value } = e.target;
    setListTheme(value);
  }
  const handleListFormSubmit = async (event) => {
    event.preventDefault();

    await CreateList({
      variables: {
        _idAdmin: id,
        name: formListName,
        theme: formListTheme
      }
    });
    setListName("");
    setListTheme("");
    refetchList();
  };

  const handleChoreNameChange = (e) => {
    const { value } = e.target;
    setChoreName(value);
  };
  const handleChoreDescChange = (e) => {
    const { value } = e.target;
    setChoreDesc(value);
  };
  const handleChorePointsChange = (e) => {
    const { value } = e.target;
    setChorePoints(value);
  };
  const handleChoreFormSubmit = async (event) => {
    event.preventDefault();

    await CreateChore({
      variables: {
        id: listData.myLists[selectedList.index]._id,
        name: formChoreName,
        description: formChoreDesc,
        points: formChorePoints,
        flavorText: "",
        theme: listData.myLists[selectedList.index].theme
      }
    });
    setChoreName("");
    setChoreDesc("");
    setChorePoints("");
    refetchList();
  }

  const finishChore = async (chore) => {
    await UpdateChore({
      variables: {
        id: listData.myLists[selectedList.index]._id,
        idChore: chore._id,
        name: chore.name,
        description: chore.description,
        points: chore.points,
        flavorText: chore.flavorText,
        isComplete: true
      }
    });
    
    await UpdateProfilePoints({
      variables: {
        id: id,
        name: selectedProfile,
        points: chore.points
      }
    });

    refetchList();
    refetchUser();
  }



  if (loading) {
    return (
      <div>...Loading</div>
    );
  }

  if (!selectedList) {
    return (
      <div>
        { isAdmin ? (
          <h1>Please Select or Create a Chore's List</h1>
        ) : (
          <h1>Please Select a Chore's List</h1>
        )}

        <ul>
          {listData.myLists.map((list, index) => (
            <li key={index} onClick={() => HandleListSelect(list.name, index) }>
              {list.name} 
              <a>Select</a>
            </li>
          ))}
        </ul>
        { isAdmin ? (
          <form>
            <h2>Create a new List</h2>
            <div>
              <h3>List Name</h3>
              <input 
                type="text"
                placeholder="Enter a Name"
                value={formListName}
                onChange={handleListNameChange}
              />
            </div>
            <div>
              <h3>List Theme</h3>
              <input 
                type="text"
                placeholder="Enter a Theme: ie. pirate, space, candy"
                value={formListTheme}
                onChange={handleListThemeChange}
              />
            </div>
            <button type="submit" onClick={handleListFormSubmit}>Submit</button>
          </form>
        ) : (
          <div></div>
        )}
        
      </div>
    )
  }

  return (
    <div>
      Welcome to the Chores Game {selectedProfile}. You have {GetProfilePoints(selectedProfile)} Points.
      {/* <EndpointBox endpoint='<API_ENDPOINT>' /> */}
      <h1>{listData.myLists[selectedList.index].name}</h1>
      {gptMessage ? (
        <p>{gptMessage}</p>
      ) : (
        <div></div>
      )}
      <ul>
        {listData.myLists[selectedList.index].chores.map(item => (
          <li key={item._id}>
            <p onClick={() => ShowFlavor(item.flavorText)}>{item.name}: {item.points} points</p>
            {item.isComplete ? (
              <p>Completed</p>
            ): (
              <p onClick={() => finishChore(item)}>Click to Complete</p>
            )}
          </li>
        ))}
      </ul>
      { isAdmin ? (
          <form>
            <h2>Add a Chore to the List</h2>
            <div>
              <h3>New Chore Name</h3>
              <input 
                type="text"
                placeholder="Enter a Name"
                value={formChoreName}
                onChange={handleChoreNameChange}
              />
            </div>
            <div>
              <h4>Description of the Chore</h4>
              <input 
                type="text"
                placeholder="What is this Chore?"
                value={formChoreDesc}
                onChange={handleChoreDescChange}
              />
            </div>
            <div>
              <p>How many rewards points is this Chore worth?</p>
              <input 
                type="text"
                placeholder="Rewards Points"
                value={formChorePoints}
                onChange={handleChorePointsChange}
              />
            </div>
            <button type="submit" onClick={handleChoreFormSubmit}>Submit</button>
          </form>
        ) : (
          <div></div>
        )}

    </div>
  );
};

// const EndpointBox = ({ endpoint }) => {
//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '50vh',
//       width: '50vw',
//       margin: '0 auto',
//       border: '1px solid black',
//       padding: '1rem'
//     }}>
//       API Endpoint: {endpoint}
//     </div>
//   );
// };

export default ProtectedPage;
