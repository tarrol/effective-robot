import React, { useState, useEffect } from "react";
import { QUERY_MYLISTS, QUERY_ME } from "../../utils/queries";
import axios from 'axios';
import { useQuery } from "@apollo/client";

const ProtectedPage = ({ isLoggedIn, selectedProfile, isAdmin }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [selectedList, setList] = useState(null);

  const { data: userData, refetch: refetchUser } = useQuery(QUERY_ME);
  const id = userData?.me._id;
  const { loading, data: listData, refetch: refetchList } 
    = useQuery(QUERY_MYLISTS, { variables: { id } } );

  console.log(listData);

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

  const HandleListSelect = (listName) => {
    setList(listName);
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
            <li key={list._id} onClick={() => HandleListSelect(list.name) }>
              {list.name} 
              <a>Select</a>
            </li>
          ))}
        </ul>
        
      </div>
    )
  }

  return (
    <div>
      Welcome to the Chores Game
      {/* <EndpointBox endpoint='<API_ENDPOINT>' /> */}
      <h1>{listData.myLists[0].name}</h1>
      <ul>
        {listData.myLists[0].chores.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
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
