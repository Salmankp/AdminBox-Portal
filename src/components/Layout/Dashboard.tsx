import React, { useState } from "react";
import Header from "./Header";
import LeftSideNav from "./LeftSideNav";
import "./Dashboard.scss";
import { useLocation } from "react-router-dom";
import ApiKeys from "../Admin/API-KEYS/ApiKeys";

function Dashboard(props: any) {

  const [showSidebar, setShowSidebar] = useState(false);

  const location = useLocation();
  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }
  return (
    <>
      <Header
        toggleSidebar={toggleSidebar}
        changeLanguage={props.changeLanguage}
      />
      <LeftSideNav showSidebar={showSidebar} />
      <div className="dashboard_main">
        <div
          className="dashboard-overlay"
          style={{ display: `${showSidebar ? "block" : "none"}` }}
          onClick={() => toggleSidebar()}
        />
        <div className="main-layout">
          
          {location.pathname && <ApiKeys />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
