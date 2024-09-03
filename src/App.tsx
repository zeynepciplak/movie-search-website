import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'; 
import Navbar from './components/Navbar/Navbar';  // Navbar bileşenini import ettik
import Slider from './components/Slider/Slider';
//import UpcomingTrailerCard from './components/UpcomingTrailers/UpcomingTrailerCard';
import UpcomingTrailers from './components/UpcomingTrailers/UpcomingTrailers';
import DetailPage from './pages/DetailPage/DetailPage';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />

        {/* Diğer rotalarınızı buraya ekleyin */}
      </Routes>
    </Router>
  );
};

export default App;
