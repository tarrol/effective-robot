import "./App.css";
import React, { useState } from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register/index";

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
  );
}

export default App;
