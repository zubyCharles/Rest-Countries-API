import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AllCountries } from './pages/AllCountries';
import { DetailedPage } from './pages/DetailedPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCountries />} />
        <Route path="/detailedPage" element={<DetailedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
