import "./App.css";
import React, { useState } from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register/index";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth_token");
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
  const [currentTab, setCurrentTab] = useState("home"); // Initial value set to "home"

  const renderTab = () => {
    switch (currentTab) {
      case "home":
        return <Home />;
      case "login":
        return <Login />;
      case "register":
        return <Register/>;
      default:
        return null;
    }
  };

  return (
    <ApolloProvider client={client}>
    <div>
      <div className="mobile-header">
        <Header currentTab={currentTab} setCurrentTab={setCurrentTab}></Header>
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
