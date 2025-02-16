import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Quiz from '../pages/Quiz';
import Section from '../pages/Section';
import Part from '../pages/Part';
import CosmeticItem from '../pages/CosmeticItem';
import Login from '../pages/Login';
import ProtectedRoutes from '../features/auth/service/ProtectedRoute';
import DailyQuests from '../pages/DailyQuests';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Navigate to="/quiz" />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/section" element={<Section />} />
          <Route path="/part" element={<Part />} />
          <Route path="/daily-quests" element={<DailyQuests />} />
          <Route path="/item" element={<CosmeticItem />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
