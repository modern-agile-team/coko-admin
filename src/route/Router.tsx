import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from '../pages/Index';
import Quiz from '../pages/Quiz';
import Header from '../component/Header';
export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}
