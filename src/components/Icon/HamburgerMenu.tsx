import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

const HamburgerMenu: React.FC = () => {
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openGenre, setOpenGenre] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab')) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleGenreClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Drawer'ın kapanmasını engeller
    setOpenGenre(!openGenre);
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <ListItemText primary={t('hamburgerMenu.Home Page')} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={t('hamburgerMenu.Movies')} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={t('hamburgerMenu.Series')} />
        </ListItem>
        <ListItem button onClick={handleGenreClick}>
          <ListItemText primary={t('hamburgerMenu.Genres')} />
          {openGenre ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGenre} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Family')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Action')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Animation')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Documentary')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Science Fiction')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Drama')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Thriller')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Comedy')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Adventure')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Romantic')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.Crime')} />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemText primary={t('hamburgerMenu.History')} />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button>
          <ListItemText primary={t('hamburgerMenu.The Newest')} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton size="large" edge="start" color="inherit" aria-label={t('hamburgerMenu.Menu')} sx={{ ml: 2 }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
