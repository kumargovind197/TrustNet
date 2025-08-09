import React, { useState } from "react";
import "../css/homepage.css";
import trustLogo from "../login/reliability.webp";
import { FaHome, FaSignInAlt, FaPhoneAlt } from "react-icons/fa";
import { FaPlus, FaEye, FaHistory } from "react-icons/fa";

export default function HomePage() {
  const userName = "Tanveersyed";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <ul className="sidebar-menu">
         <li><FaHome className="sidebar-icon" /> Home</li>
          <li><FaSignInAlt className="sidebar-icon" /> Login</li>
          <li><FaPhoneAlt className="sidebar-icon" /> Contact</li>
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Top Navbar */}
      <header className="navbar">
        <div className="nav-left">
          <img src={trustLogo} alt="TrustNet" className="nav-logo" />
          <span className="nav-title">TrustNet</span>
        </div>
        <div className="nav-menu" onClick={toggleSidebar}>☰</div>
      </header>

      {/* Welcome Message */}
      <h2 className="welcome-text">Welcome, <br />{userName}</h2>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card promises">
          <h3>15</h3>
          <p>Promises</p>
        </div>
        <div className="stat-card trust-score">
          <h3>78</h3>
          <p>Trust Score</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="quick-action-title">Quick Action</h3>
      <div className="quick-grid">
        <div className="quick-card add-promise">
         <span className="icon"><FaPlus /></span>

          <p>Add Promise</p>
        </div>
        <div className="quick-card view-score">
        <span className="icon"><FaEye /></span>

          <p>View Score</p>
        </div>
      </div>

      {/* Activity History */}
      <button className="activity-btn">
        <span className="icon"><FaHistory /></span>
Activity History</button>

      {/* Recent Activity */}
      <div className="recent-section">
        <h3>Recent Activity</h3>
      </div>
    </div>
  );
}
