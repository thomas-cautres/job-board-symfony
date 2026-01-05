import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

interface RequireAuthProps {
}

import { isTokenExpired } from '@/lib/jwt';

const RequireAuth: React.FC<RequireAuthProps> = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token || isTokenExpired(token)) {
    // If expired, clean up
    if (token) localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
