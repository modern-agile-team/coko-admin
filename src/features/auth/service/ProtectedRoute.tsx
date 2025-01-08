import { Navigate, Outlet } from 'react-router-dom';

import { PropsWithChildren } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function ProtectedRoutes() {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
