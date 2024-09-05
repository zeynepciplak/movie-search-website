import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, IconButton, AppBar, Toolbar, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import  '../../styles/global.css';

const HamburgerMenu: React.FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openGenre, setOpenGenre] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGenreClick = () => {
    setOpenGenre(!openGenre);
  };

  return (
    <Box >
      <AppBar className='appBar' position="static">
        <Toolbar className='hamburgeer' >
          <IconButton    color="inherit" onClick={handleMenuOpen}>
            <MenuIcon className='hamburger'/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ width: '100%' }} // Responsive tam genişlik
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary={t('hamburgerMenu.Home Page')} />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary={t('hamburgerMenu.Movies')} />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary={t('hamburgerMenu.Series')} />
        </MenuItem>
        <MenuItem onClick={handleGenreClick}>
          <ListItemText primary={t('hamburgerMenu.Genres')} />
          {openGenre ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={openGenre} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Action')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Adventure')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Animation')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Comedy')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Crime')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Documentary')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Drama')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Family')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.History')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Romantic')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Science Fiction')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Thriller')} />
            </ListItem>
          </List>
        </Collapse>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary={t('hamburgerMenu.The Newest')} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HamburgerMenu;
