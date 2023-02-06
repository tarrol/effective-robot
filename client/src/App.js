import "./App.css";
import React, { useState } from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register/index";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth_token");

  // console.log(token);
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [currentTab, setCurrentTab] = useState("login"); // Initial value set to "home"
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const renderTab = () => {
    switch (currentTab) {
      case "home":
        return <Home />;
      case "login":
        return <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentTab={setCurrentTab} />;
      case "register":
        return <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentTab={setCurrentTab} />;
      case "profile":
        return <Profile 
          isLoggedIn={isLoggedIn} 
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
         />;
      case "game":
        return <Game 
          isLoggedIn={isLoggedIn} 
          selectedProfile={selectedProfile}
          isAdmin={isAdmin}
        />;
      default:
        return null;
    }
  };

  return (
    <ApolloProvider client={client}>
    <div>
      <div className="mobile-header">
        <Header currentTab={currentTab} setCurrentTab={setCurrentTab}
                isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} > 
        </Header>
      </div>
      <div>
        <main>{renderTab()}</main>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
    </ApolloProvider>
  );
}

export default App;
