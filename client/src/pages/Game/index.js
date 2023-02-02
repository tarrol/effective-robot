import React, { useState, useEffect } from "react";
import axios from 'axios';

const ProtectedPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('<API_ENDPOINT>');
      setData(result.data);
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <button onClick={() => setIsLoggedIn(true)}>Login</button>;
  }

  return (
    <div>
      Welcome to the Chores Game
      <EndpointBox endpoint='<API_ENDPOINT>' />
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

const EndpointBox = ({ endpoint }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      width: '50vw',
      margin: '0 auto',
      border: '1px solid black',
      padding: '1rem'
    }}>
      API Endpoint: {endpoint}
    </div>
  );
};

export default ProtectedPage;
