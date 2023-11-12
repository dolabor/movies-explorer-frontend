import React, { useMemo } from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, isLoggedIn  }) => {
  return (
    useMemo(() => isLoggedIn ? Component : <Navigate to="/" replace/>, [isLoggedIn, Component])
)}

export default ProtectedRouteElement;
