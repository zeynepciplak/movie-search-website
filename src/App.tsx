import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './i18n';
import HomePage from './pages/HomePage/HomePage';

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Navbar /> {/* Navbar bileşenini ekledik */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Ana sayfa */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

