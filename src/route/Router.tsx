import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Quiz from '../pages/Quiz';
import Header from '../common/Header';
import Section from '../pages/Section';
import Part from '../pages/Part';
import CosmeticItem from '../pages/CosmeticItem';
export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/section" element={<Section />} />
        <Route path="/part" element={<Part />} />
        <Route path="/item" element={<CosmeticItem />} />
      </Routes>
    </BrowserRouter>
  );
}
