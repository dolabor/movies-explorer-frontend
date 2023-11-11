import React from 'react';

const ProtectedRouteElement = ({ element: Component, isLoggedIn  }) => {
  return (
    isLoggedIn ? Component : null
)}

export default ProtectedRouteElement;
