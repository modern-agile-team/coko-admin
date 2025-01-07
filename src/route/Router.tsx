import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Quiz from '../pages/Quiz';
import Header from '../common/Header';
import Section from '../pages/Section';
import Part from '../pages/Part';
import Login from '../pages/Login';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/section" element={<Section />} />
        <Route path="/part" element={<Part />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
