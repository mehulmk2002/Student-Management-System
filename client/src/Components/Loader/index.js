import React from "react";
import './style.css';

const Loader = (prop) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">{prop.desc}, Please wait...</p>
    </div>
  );
};

export default Loader;
