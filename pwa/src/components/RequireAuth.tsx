import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

interface RequireAuthProps {
}

const RequireAuth: React.FC<RequireAuthProps> = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
