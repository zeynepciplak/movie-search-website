import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'; 
import Navbar from './components/Navbar/Navbar';  // Navbar bileşenini import ettik
import Slider from './components/Slider/Slider';
//import UpcomingTrailerCard from './components/UpcomingTrailers/UpcomingTrailerCard';
import UpcomingTrailers from './components/UpcomingTrailers/UpcomingTrailers';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> 
      <UpcomingTrailers />
      
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Diğer rotalarınızı buraya ekleyin */}
      </Routes>
    </Router>
  );
};

export default App;
