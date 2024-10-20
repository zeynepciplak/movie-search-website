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
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]); 
  const [tvGenres, setTVGenres] = useState<Genre[]>([]); 
  const navigate = useNavigate();

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
    setDrawerOpen(false); 
  };

  return (
    <Box className="hamburger-container">
      <AppBar position="static" className="appBar">
        <Toolbar className="hamburger">
          <Button color="inherit" className="hamburger-button" onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: '#FFFFFF' }} /> 
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"  // Yukarıdan açılacak
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            width: '80%',  
            backgroundColor: '#2e3134',  
            marginLeft: '50px',
          },
        }}
      >
        <Box className="hamburger-drawer" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          {/* Başlıkları 2 sütun olarak gösteriyoruz */}
          <Grid container spacing={2} className="menu-grid">
            <Grid item xs={6}>
              <ListItem button onClick={() => navigate('/')}>
                <ListItemText primary={t('hamburgerMenu.Home Page')} className="menu-item-text" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem button onClick={() => navigate('/imdb-top-100-movies')}>
                <ListItemText primary={t('hamburgerMenu.Top 100 Movies')} className="menu-item-text" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem button onClick={() => navigate('/awardwinningmovies')}>
                <ListItemText primary={t('hamburgerMenu.Award Winning Movies')} className="menu-item-text" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem button onClick={() => navigate('/most-popular-artists')}>
                <ListItemText primary={t('hamburgerMenu.Most Popular Artists')} className="menu-item-text" />
              </ListItem>
            </Grid>
          </Grid>

          {/* Movies ve TV Genres yan yana sıralanacak şekilde iki sütuna bölündü */}
          <Grid container spacing={2} className="menu-grid">
            <Grid item xs={6}>
              <Typography variant="subtitle1" className="category-header">{t('hamburgerMenu.Movies')}</Typography>
              <Grid container spacing={2}>
                {movieGenres.map((genre, index) => (
                  <Grid item xs={6} key={genre.id}> {/* İkiye bölündü */}
                    <ListItem button onClick={() => handleGenreClick(genre.id, 'movie')} className="menu-item">
                      <ListItemText primary={genre.name} />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1" className="category-header">{t('hamburgerMenu.Tv Series')}</Typography>
              <Grid container spacing={2}>
                {tvGenres.map((genre, index) => (
                  <Grid item xs={6} key={genre.id}> {/* İkiye bölündü */}
                    <ListItem button onClick={() => handleGenreClick(genre.id, 'tv')} className="menu-item">
                      <ListItemText primary={genre.name} />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Box>
  );
};

export default HamburgerMenu;
