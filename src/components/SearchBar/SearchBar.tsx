import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, List, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { fetchSearchResults } from '../../api/tmdbApi'; // Arama API fonksiyonu
import { useTranslation } from 'react-i18next';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '600px', // Daha geniş yapılıyor
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',  // Her zaman genişlik tam olacak
    [theme.breakpoints.up('sm')]: {
      width: '600px',  // Arama çubuğu için genişlik
      '&:focus': {
        width: '750px',  // Fokuslanınca daha da genişleyecek
      },
    },
  },
}));

const SearchResults = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
  maxHeight: '300px',
  overflowY: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  [theme.breakpoints.down('sm')]: {
    width: '100vw', // Küçük ekranlarda tam genişlik
  },
}));

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Arama sorgusunu takip eden state
  const [searchResults, setSearchResults] = useState<any[]>([]); // Arama sonuçlarını tutan state
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]); // Arama kutusu boşken sonuçları temizle
        return;
      }

      try {
        const results = await fetchSearchResults(searchQuery); // Arama sorgusuna göre sonuçları getir
        setSearchResults(results);
      } catch (error) {
        console.error('Arama sonuçları getirilirken hata oluştu:', error);
      }
    };

    const debounceFetch = setTimeout(fetchResults, 500); // 500ms bekleme (debounce)

    return () => clearTimeout(debounceFetch); // Yeni bir sorgu girilince önceki isteği iptal et
  }, [searchQuery]);

  const handleResultClick = (result: any) => {
    const path = result.media_type === 'movie' ? `/movies/${result.id}` : `/series/${result.id}`;
    navigate(path);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t('header.Search')}
          inputProps={{ 'aria-label': t('Search') }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Arama sorgusu güncelleniyor
        />
      </Search>

      {searchResults.length > 0 && (
        <SearchResults>
          <List>
            {searchResults.map((result) => (
              <ListItem button key={result.id} onClick={() => handleResultClick(result)}>
                <ListItemText
                  primary={result.title || result.name} // Filmse 'title', diziyse 'name'
                  secondary={result.release_date || result.first_air_date}
                />
              </ListItem>
            ))}
          </List>
        </SearchResults>
      )}
    </div>
  );
};

export default SearchBar;
