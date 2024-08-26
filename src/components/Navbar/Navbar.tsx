import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, FormControl, Select, MenuItem, IconButton } from '@mui/material';
import HamburgerMenu from '../Icon/HamburgerMenu';
import SearchBar from '../SearchBar/SearchBar';
import { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HomeButton from '../Icon/HomeButton';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(localStorage.getItem('i18n') || i18n.language || 'en-US');

  useEffect(() => {
    // Component ilk yüklendiğinde dil ayarını localStorage'den alıyoruz
    const storedLanguage = localStorage.getItem('i18n');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value as string;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18n', selectedLanguage); // Seçilen dili localStorage'a kaydediyoruz
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'var(--highlight-color)' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0.1, display: { xs: 'none', sm: 'block' } }}>
            {t("LOGO")}
          </Typography>
          <HomeButton />
          <HamburgerMenu  /> {/* currentLanguage prop olarak geçiyoruz */}
          <SearchBar />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton sx={{ color: 'inherit', ml: 2 }}>{t('Log In')}</IconButton>
            <FormControl variant="standard" sx={{ ml: 2, minWidth: 80, borderBottom: 'none' }}>
              <Select
                id="language-select"
                value={language}
                onChange={handleChange}
                sx={{ color: 'white', '.MuiSelect-select:focus': { backgroundColor: 'transparent' }, '.MuiSvgIcon-root': { color: 'white' }, '&::before, &::after': { borderBottom: 'none' } }}
              >
                <MenuItem value="en-US">EN</MenuItem>
                <MenuItem value="tr-TR">TR</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
