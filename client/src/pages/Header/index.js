import React from "react";
import Navigation from "../Navigation";

function Header({currentTab, setCurrentTab, isLoggedIn, setIsLoggedIn }) {
  // const { currentTab, setCurrentTab } = props;

  return (
    <header>
      <div>
        {/* <h2>Logo</h2> */}
      </div>
      <div>
        <Navigation
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        ></Navigation>
      </div>
    </header>
  );
}

export default Header;
