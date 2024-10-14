import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, IconButton, AppBar, Toolbar, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../styles/global.css';
import { fetchMovieGenres, fetchTVGenres, Genre } from '../../api/tmdbApi';

const HamburgerMenu: React.FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openGenre, setOpenGenre] = useState(false);  // Film ve dizi türleri için açılır/kapanır
  const [openNewest, setOpenNewest] = useState(false);  // En yeni seçeneği için state
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);  // Film türleri
  const [tvGenres, setTVGenres] = useState<Genre[]>([]);  // Dizi türleri
  const navigate = useNavigate();

  // Film ve dizi türlerini çek
  useEffect(() => {
    const loadGenres = async () => {
      const movieGenresData = await fetchMovieGenres('en-US');  // Film türlerini çek
      const tvGenresData = await fetchTVGenres('en-US');  // Dizi türlerini çek
      setMovieGenres(movieGenresData);
      setTVGenres(tvGenresData);
    };

    loadGenres();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Türler menüsünü aç/kapa
  const handleGenreToggle = () => {
    setOpenGenre(!openGenre);
  };

  // Tür tıklandığında yönlendirme
  const handleGenreClick = (genreId: number, mediaType: 'movie' | 'tv') => {
    if (mediaType === 'movie') {
      navigate(`/movies/genre/${genreId}`);  // Filmlere yönlendirme
    } else {
      navigate(`/series/genre/${genreId}`);  // Dizilere yönlendirme
    }
    handleMenuClose();  // Menü kapansın
  };

  const handleNewestClick = () => {
    setOpenNewest(!openNewest);  // En yeni seçeneğini aç/kapa
  };

  const handleNewestMoviesClick = () => {
    handleMenuClose();
    navigate('/newest-movies');  // En yeni filmler sayfasına yönlendirme
  };

  const handleNewestSeriesClick = () => {
    handleMenuClose();
    navigate('/newest-series');  // En yeni diziler sayfasına yönlendirme
  };

  const handleIMDBTop100Click = () => {
    handleMenuClose();
    navigate('/imdb-top-100-movies');
  };

  const handleAwardWinningMoviesClick = () => {
    handleMenuClose();
    navigate('/awardwinningmovies');
  };

  const handleHomePageClick = () => {
    handleMenuClose();
    navigate('/');
  };

  const handleMostPopularArtistsClick = () => {
    handleMenuClose();
    navigate('/most-popular-artists');
  };

  const handleTopDirectorsClick = () => {
    handleMenuClose();
    navigate('/topdirectors');
  };

  const handleMoviesClick = () => {
    handleMenuClose();
    navigate('/movies');
  };

  const handleSeriesClick = () => {
    handleMenuClose();
    navigate('/series');
  };

  return (
    <Box>
      <AppBar className="appBar" position="static">
        <Toolbar className="hamburger">
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon className="hamburger" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ width: '100%' }}  // Responsive tam genişlik
      >
        <MenuItem onClick={handleHomePageClick}>
          <ListItemText primary={t('hamburgerMenu.Home Page')} />
        </MenuItem>

        {/* Movies and Series Sections */}
        <MenuItem onClick={handleMoviesClick}>
          <ListItemText primary={t('hamburgerMenu.Movies')} />
        </MenuItem>
        <MenuItem onClick={handleSeriesClick}>
          <ListItemText primary={t('hamburgerMenu.Series')} />
        </MenuItem>

        {/* Genre Sections */}
        <MenuItem onClick={handleGenreToggle}>
          <ListItemText primary={t('hamburgerMenu.Genres')} />
          {openGenre ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>

        <Collapse in={openGenre} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Typography variant="subtitle1" sx={{ padding: '10px' }}>Movies</Typography>
            {movieGenres.map((genre) => (
              <ListItem button key={genre.id} sx={{ pl: 4 }} onClick={() => handleGenreClick(genre.id, 'movie')}>
                <ListItemText primary={genre.name} />
              </ListItem>
            ))}
            <Typography variant="subtitle1" sx={{ padding: '10px' }}>TV Series</Typography>
            {tvGenres.map((genre) => (
              <ListItem button key={genre.id} sx={{ pl: 4 }} onClick={() => handleGenreClick(genre.id, 'tv')}>
                <ListItemText primary={genre.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* The Newest Menu */}
        <MenuItem onClick={handleNewestClick}>
          <ListItemText primary={t('hamburgerMenu.The Newest')} />
          {openNewest ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>

        <Collapse in={openNewest} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={handleNewestMoviesClick}>
              <ListItemText primary={t('hamburgerMenu.Newest Movies')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={handleNewestSeriesClick}>
              <ListItemText primary={t('hamburgerMenu.Newest Series')} />
            </ListItem>
          </List>
        </Collapse>

        <MenuItem onClick={handleIMDBTop100Click}>
          <ListItemText primary={t('hamburgerMenu.Top 100 Movies')} />
        </MenuItem>
        <MenuItem onClick={handleAwardWinningMoviesClick}>
          <ListItemText primary={t('hamburgerMenu.Award Winning Movies')} />
        </MenuItem>
        <MenuItem onClick={handleMostPopularArtistsClick}>
          <ListItemText primary={t('hamburgerMenu.Most Popular Artists')} />
        </MenuItem>
        <MenuItem onClick={handleTopDirectorsClick}>
          <ListItemText primary={t('hamburgerMenu.Top Directors')} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HamburgerMenu;
