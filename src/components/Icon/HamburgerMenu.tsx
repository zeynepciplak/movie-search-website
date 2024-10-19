import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Button, Drawer, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../components/Icon/HamburgerMenu.css';
import { fetchMovieGenres, fetchTVGenres, Genre } from '../../api/tmdbApi';

const HamburgerMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);  // Film türleri
  const [tvGenres, setTVGenres] = useState<Genre[]>([]);  // Dizi türleri
  const navigate = useNavigate();

  // Film ve dizi türlerini çekiyoruz
  useEffect(() => {
    const loadGenres = async () => {
      const movieGenresData = await fetchMovieGenres(i18n.language);
      const tvGenresData = await fetchTVGenres(i18n.language);
      setMovieGenres(movieGenresData);
      setTVGenres(tvGenresData);
    };
    loadGenres();
  }, [i18n.language]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleGenreClick = (genreId: number, mediaType: 'movie' | 'tv') => {
    if (mediaType === 'movie') {
      navigate(`/movies/genre/${genreId}`);
    } else {
      navigate(`/series/genre/${genreId}`);
    }
    setDrawerOpen(false);  // Drawer'ı kapat
  };

  return (
    <Box className="hamburger-container">
      <AppBar position="static" className="appBar">
        <Toolbar className="hamburger">
          <Button color="inherit" className="hamburger-button" onClick={toggleDrawer(true)}>
            <MenuIcon />
            <Typography variant="h6" sx={{ ml: 1 }}>{t('hamburgerMenu.Categories')}</Typography>
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            width: '600px',
            backgroundColor: '#FFD700',  // Sarı arka plan
          },
        }}
      >
        <Box className="hamburger-drawer" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          {/* Ana Sayfa ve diğer sabit başlıklar */}
          <List>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemText primary={t('hamburgerMenu.HomePage')} />
            </ListItem>
            <ListItem button onClick={() => navigate('/imdb-top-100-movies')}>
              <ListItemText primary={t('hamburgerMenu.Top100Movies')} />
            </ListItem>
            <ListItem button onClick={() => navigate('/awardwinningmovies')}>
              <ListItemText primary={t('hamburgerMenu.AwardWinningMovies')} />
            </ListItem>
            <ListItem button onClick={() => navigate('/most-popular-artists')}>
              <ListItemText primary={t('hamburgerMenu.MostPopularArtists')} />
            </ListItem>
            <ListItem button onClick={() => navigate('/topdirectors')}>
              <ListItemText primary={t('hamburgerMenu.TopDirectors')} />
            </ListItem>
          </List>

          {/* Yatay genişleyen türler listesi */}
          <Grid container spacing={2} className="menu-grid">
            <Grid item xs={6}>
              <Typography variant="subtitle1" className="category-header">{t('hamburgerMenu.Movies')}</Typography>
              {movieGenres.map((genre) => (
                <ListItem button key={genre.id} onClick={() => handleGenreClick(genre.id, 'movie')} className="menu-item">
                  <ListItemText primary={genre.name} />
                </ListItem>
              ))}
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1" className="category-header">{t('hamburgerMenu.TVSeries')}</Typography>
              {tvGenres.map((genre) => (
                <ListItem button key={genre.id} onClick={() => handleGenreClick(genre.id, 'tv')} className="menu-item">
                  <ListItemText primary={genre.name} />
                </ListItem>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Box>
  );
};

export default HamburgerMenu;
