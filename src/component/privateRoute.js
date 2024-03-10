// PrivateRoute.js

import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if token is available in localStorage
  console.log(isLoggedIn)
  return isLoggedIn ? (
    <Routes>    
        <Route  element={Element} />
    </Routes>

  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
