import React, { useState, useEffect } from "react";
import { QUERY_MYLISTS, QUERY_ME } from "../../utils/queries";
import { CREATE_LIST, CREATE_CHORE } from "../../utils/choreMutations";
import axios from 'axios';
import { useQuery, useMutation } from "@apollo/client";

const ProtectedPage = ({ isLoggedIn, selectedProfile, isAdmin }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [selectedList, setList] = useState(null);

  const [formListName, setListName] = useState("");
  const [formChoreName, setChoreName] = useState("");
  const [formChoreDesc, setChoreDesc] = useState("");
  const [formChorePoints, setChorePoints] = useState("");

  const [CreateList] = useMutation(CREATE_LIST);
  const [CreateChore] = useMutation(CREATE_CHORE);

  const { data: userData, refetch: refetchUser } = useQuery(QUERY_ME);
  const id = userData?.me._id;
  const { loading, data: listData, refetch: refetchList } 
    = useQuery(QUERY_MYLISTS, { variables: { id } } );


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios('<API_ENDPOINT>');
  //     setData(result.data);
  //   };

  //   if (isLoggedIn) {
  //     fetchData();
  //   }
  // }, [isLoggedIn]);

  // if (!isLoggedIn) {
  //   return <button onClick={() => setIsLoggedIn(true)}>Login</button>;
  // }

  const HandleListSelect = (listName, index) => {
    setList({'listName': listName, 'index': index});
  };
  const handleListNameChange = (e) => {
    const { value } = e.target;
    setListName(value);
  };
  const handleListFormSubmit = async (event) => {
    event.preventDefault();

    await CreateList({
      variables: {
        _idAdmin: id,
        name: formListName
      }
    });
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
    // event.
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
                placeholder="Enter profile name"
                value={formListName}
                onChange={handleListNameChange}
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
      Welcome to the Chores Game
      {/* <EndpointBox endpoint='<API_ENDPOINT>' /> */}
      <h1>{listData.myLists[selectedList.index].name}</h1>
      <ul>
        {listData.myLists[selectedList.index].chores.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      { isAdmin ? (
          <form>
            <h2>Add a Chore to the List</h2>
            <div>
              <h3>New Chore Name</h3>
              <input 
                type="text"
                placeholder="Enter profile name"
                value={formChoreName}
                onChange={handleChoreNameChange}
              />
            </div>
            <div>
              <h4>Description of the Chore</h4>
              <input 
                type="text"
                placeholder="Enter profile name"
                value={formChoreDesc}
                onChange={handleChoreDescChange}
              />
            </div>
            <div>
              <p>How many rewards points is this Chore worth?</p>
              <input 
                type="text"
                placeholder="Enter profile name"
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
