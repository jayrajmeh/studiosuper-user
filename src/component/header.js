import React from 'react';
import {  useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here, such as clearing local storage and redirecting to the login page
    localStorage.removeItem('token');
    navigate(`/`);// Redirect to the login page after logout
    window.location.reload()
  };

  return (
    <header>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
