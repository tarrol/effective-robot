import React from "react";

function Navigation(props) {
  const { currentTab, setCurrentTab } = props;

  return (
    <nav>
      <ul className="flex-row mobile-view">
        <li className={currentTab === "home" ? "mx-2 navActive" : "mx-2"}>
          <span onClick={() => setCurrentTab("home")}>Home </span>
        </li>
        <li className={currentTab === "login" ? "mx-2 navActive" : "mx-2"}>
          <span onClick={() => setCurrentTab("login")}>Log in</span>
        </li>
        <li className={currentTab === "register" ? "mx-2 navActive" : "mx-2"}>
          <span onClick={() => setCurrentTab("register")}>Register</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
