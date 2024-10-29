import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from '../pages/Index';
import Quiz from '../pages/Quiz';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}
