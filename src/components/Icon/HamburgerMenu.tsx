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

  const handleGenreClick = () => {
    setOpenGenre(!openGenre);
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
      <ListItem button>
          <ListItemText primary={t('Ana Sayfa')} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={t('Filmler')} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={t('Diziler')} />
        </ListItem>
        <ListItem button onClick={handleGenreClick}>
          <ListItemText primary={t('Türler')} />
          {openGenre ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGenre} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Aile')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Aksiyon')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Animasyon')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Belgesel')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Bilim Kurgu')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Dram')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Gerilim')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Komedi')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Macera')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Romantik')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Suç')} />
</ListItem>
<ListItem button sx={{ pl: 4 }}>
  <ListItemText primary={t('Tarih')} />
</ListItem>

          </List>
        </Collapse>
        <ListItem button>
          <ListItemText primary={t('En Yeniler')} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton size="large" edge="start" color="inherit" aria-label={t('Menu')} sx={{ ml: 2 }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
