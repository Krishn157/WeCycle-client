import React, { useState } from "react";
import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";
import AppSideBar from "../components/AppSideBar";

const HomePage = () => {
  const [sideBarShow, setSideBarShow] = useState(true);

  const toggleSideBar = () => {
    console.log("click");
    setSideBarShow(!sideBarShow);
  };
  return (
    <div>
      <AppSideBar sideBarShow={sideBarShow} />

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader toggleSideBar={toggleSideBar} />

        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
