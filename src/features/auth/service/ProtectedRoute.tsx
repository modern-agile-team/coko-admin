import { Navigate } from 'react-router-dom';

import { PropsWithChildren } from 'react';

export default function ProtectedRoute({
  children,
  isLoginin,
}: PropsWithChildren<{ isLoginin: boolean }>) {
  return isLoginin ? children : <Navigate to="/login" replace />;
}
