import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AllCountries } from './pages/AllCountries';
import { DetailedPage } from './pages/DetailedPage';
import { ErrorPage } from './pages/ErrorPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCountries />} />
        <Route path="/detailedPage" element={<DetailedPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
