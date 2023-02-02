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
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProtectedPage;
