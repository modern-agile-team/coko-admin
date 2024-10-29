import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from '../pages/Index';
import Quiz from '../pages/Quiz';
import Header from '../component/Header';
import Section from '../pages/Section';
export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/section" element={<Section />} />
        <Route path="/part" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}
