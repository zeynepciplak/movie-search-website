
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar'; 
import ImdbTop100Movies from './pages/ImdbTop100Movies/ImdbTop100Movies';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Footer from './components/Footer/Footer';
import MostPopularArtists from './pages/MostPopularArtists/MostPopularArtists';
import AwardWinningMovies from './pages/AwardWinningMovies/AwardWinningMovies';
import NewestMovies from './pages/NewestMovies/NewestMovies';
import NewestSeries  from './pages/NewestSeries/NewestSeries';
import LoginPage from './pages/LoginPage/LoginPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import SeriesPage from './pages/SeriesPage/SeriesPage';
import MoviesByGenrePage from './pages/MoviesByGenrePage/MoviesByGenrePage';
import SeriesByGenrePage from './pages/SeriesByGenrePage/SeriesByGenrePage';
import DetailPage from './pages/DetailPage/DetailPage';

// Tema oluşturma
const theme = createTheme({
  palette: {
    background: {
      default: '#2e3134',  // Sayfa genel arka plan rengi
      paper: '#2e3134',    // Kartlar ve menüler gibi "kağıt" bileşenler için
    },
    primary: {
      main: '#3A3A3A',     // Birincil renk
    },
    secondary: {
      main: '#FFD700',     // İkincil renk, genellikle vurgu rengi
    },
    text: {
      primary: '#FFFFFF',  // Varsayılan beyaz yazı rengi
    },
  },
  typography: {
    body2: {
      fontSize: '14px', // body2 için varsayılan font boyutu 
      textAlign: 'left', // Genel olarak sola hizalayacak
      color:'#6d6d6d',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1C1C1C',  // AppBar için arka plan rengi
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#3A3A3A',  // Butonlar için arka plan rengi
          color: '#FFD700',  // Buton metni için detay rengi
          '&:hover': {
            backgroundColor: '#2e3134',  // Hover durumu
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movies/genre/:genreId" element={<MoviesByGenrePage />} />
          <Route path="/series/genre/:genreId" element={<SeriesByGenrePage />} />
          <Route path="/imdb-top-100-movies" element={<ImdbTop100Movies />} /> 
          <Route path="/most-popular-artists" element={<MostPopularArtists />} />
          <Route path="/detail-page/:id/:type" element={<DetailPage />} />
         
          <Route path="/awardwinningmovies" element={<AwardWinningMovies />} /> 
          
          <Route path="/newest-movies" element={<NewestMovies />} />
        <Route path="/newest-series" element={<NewestSeries />} />
        <Route path="/movies" element={<MoviesPage />} /> 
        <Route path="/series" element={<SeriesPage />} /> 

        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
};

export default App;
