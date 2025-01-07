import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Quiz from '../pages/Quiz';
import Section from '../pages/Section';
import Part from '../pages/Part';
import Login from '../pages/Login';
import ProtectedRoute from '../features/auth/service/ProtectedRoute';

const routes = [
  { path: '/quiz', element: <Quiz />, isProtected: true },
  { path: '/section', element: <Section />, isProtected: true },
  { path: '/part', element: <Part />, isProtected: true },
  { path: '/login', element: <Login />, isProtected: false },
] as const;

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" />} />
        {routes.map(({ path, element, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute isLoginin={true}>{element}</ProtectedRoute>
              ) : (
                element
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
