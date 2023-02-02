import React from "react";

function Navigation(props) {
  const { currentTab, setCurrentTab } = props;
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <nav>
      <ul className="flex-row mobile-view">
        <li className={currentTab === "home" ? "mx-2 navActive" : "mx-2"}>
          <span onClick={() => setCurrentTab("home")}>Home </span>
        </li>
        {isLoggedIn && (
          <li className={currentTab === "game" ? "mx-2 navActive" : "mx-2"}>
            <span onClick={() => setCurrentTab("game")}>Game</span>
          </li>
        )}
        <li className={currentTab === "login" ? "mx-2 navActive" : "mx-2"}>
          <span onClick={() => setCurrentTab("login")}>Login</span>
        </li>
        <li className={currentTab === "register" ? "mx-2 navActive" : "mx-2"}>
          <span onClick={() => setCurrentTab("register")}>Register</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
