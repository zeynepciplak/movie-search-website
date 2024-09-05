import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, FormControl, Select, MenuItem, IconButton } from '@mui/material';
import HamburgerMenu from '../Icon/HamburgerMenu';
import SearchBar from '../SearchBar/SearchBar';
import { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HomeButton from '../Icon/HomeButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import  '../../styles/global.css';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();  // Çeviri fonksiyonunu alıyoruz
  const [language, setLanguage] = useState<string>(localStorage.getItem('i18n') || i18n.language || 'en-US');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18n');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value as string;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage)
      .then(() => {
        localStorage.setItem('i18n', selectedLanguage);  // Seçilen dili localStorage'a kaydediyoruz
        console.log(`Dil değiştirildi: ${selectedLanguage}`);
      })
      .catch((error) => {
        console.error('Dil değiştirilemedi:', error);
      });
  };

  const handleLoginClick = () => {
    // Burada login işlemleri için bir fonksiyon çağırabilirsin
    console.log("Giriş Yap butonuna tıklandı!");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'var(--highlight-color)' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0.1, display: { xs: 'none', sm: 'block' } }}>
            {t('header.LOGO')}
          </Typography>
          <HomeButton />
          <div className='appBar'>

          <HamburgerMenu />
          </div>
          <SearchBar />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton sx={{ color: 'inherit', ml: 2 }} onClick={handleLoginClick}>
              <AccountCircleIcon /> {/* AccountCircleIcon burada kullanıldı */}
              {t('header.Log In')}
            </IconButton>
            <FormControl variant="standard" sx={{ ml: 2, minWidth: 80, borderBottom: 'none' }}>
              <Select
                id="language-select"
                value={language}
                onChange={handleChange}
                sx={{
                  color: 'white',
                  '.MuiSelect-select:focus': { backgroundColor: 'transparent' },
                  '.MuiSvgIcon-root': { color: 'white' },
                  '&::before, &::after': { borderBottom: 'none' },
                  '.MuiOutlinedInput-notchedOutline': { borderBottom: 'none', border: 'none' }, // Outlined borderları kaldırır
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottom: 'none', // Hover durumunda alt çizgi olmaması
                  },
                  '& .MuiInput-underline:before': {
                    borderBottom: 'none', // Alt çizgiyi tamamen kaldırır
                  },
                }}
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
