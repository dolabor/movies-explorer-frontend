import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, isLoggedIn  }) => {
  return (
    isLoggedIn ? Component : null
)}

export default ProtectedRouteElement;
