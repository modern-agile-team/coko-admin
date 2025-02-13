import { Navigate, Outlet } from 'react-router-dom';
import { authQueries } from '../queries';

export default function ProtectedRoutes() {
  const { isLoading, isError } = authQueries.useVerify();

  if (isLoading) {
    return <div>인증 권한 확인 중.............</div>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
