import React, { useState, useEffect } from 'react';
import './WelcomeHome.css';

const WelcomeHome = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setAnimate(true);
  }, []);

  return (
    <div className={`welcome-container ${animate ? 'animate' : ''}`}>
    <div className="blast-flower">
      <div className="animation-wrapper">
        <h1 className="welcome-text">Welcome To</h1>
        <h1 className="center-text">MEET COMPUTER TRAINING CENTER</h1>
      </div>
      </div>
    </div>
  );
};

export default WelcomeHome;
