// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar'; // Navbar bileşenini import ettik
import DetailPage from './pages/DetailPage/DetailPage';
import ImdbTop100Movies from './pages/ImdbTop100Movies/ImdbTop100Movies'; // IMDb bileşenini import et
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ArtistDetails from './pages/MostPopularArtists/MostPopularArtists';
import MostPopularArtists from './pages/MostPopularArtists/MostPopularArtists';
import AwardWinningMovies from './pages/AwardWinningMovies/AwardWinningMovies';
import TopDirectors from './pages/TopDirectors/TopDirectors';
import DirectorDetails from './pages/TopDirectors/DirectorDetails';
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
      fontSize: '14px', // body2 için varsayılan font boyutu 12px olacak
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
          <Route path="/imdb-top-100-movies" element={<ImdbTop100Movies />} /> {/* IMDb Top 100 Movies rotası */}
          <Route path="/most-popular-artists" element={<MostPopularArtists />} />
          <Route path="/artist/:artistId" element={<ArtistDetails />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/awardwinningmovies" element={<AwardWinningMovies />} /> 
          <Route path="/top-directors" element={<TopDirectors />} />
          <Route path="/director/:directorId" element={<DirectorDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
