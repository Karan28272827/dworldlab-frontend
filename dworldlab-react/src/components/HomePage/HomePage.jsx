import React from "react";
import Navigation from "../Navbar/navbar";
import ToolDirectory from "../ToolDirectory/ToolDirectory";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container">
      <Navigation />
      <ToolDirectory />
    </div>
  );
};

export default HomePage;
