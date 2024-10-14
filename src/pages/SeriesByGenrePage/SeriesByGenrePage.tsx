import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import { fetchTVShowsByGenre, Series } from '../../api/tmdbApi'; // API fonksiyonları
import MediaCard from '../../components/MediaCard/MediaCard';
import LoadingIcon from '../../components/Loading/LoadingIcon'; // Yükleme ikonu
import { useTranslation } from 'react-i18next';

const SeriesByGenrePage: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>(); // URL parametresinden genreId'yi alıyoruz
  const [series, setSeries] = useState<Series[]>([]); // Dizi listesi state'i
  const [loading, setLoading] = useState<boolean>(true); // Yükleme durumu için state
  const { i18n, t } = useTranslation(); // Dil desteği
  
  useEffect(() => {
    const loadSeriesByGenre = async () => {
      if (!genreId) return;

      setLoading(true);
      try {
        const data = await fetchTVShowsByGenre(parseInt(genreId), i18n.language);
        setSeries(data);
      } catch (error) {
        console.error('Dizileri çekerken bir hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSeriesByGenre();
  }, [genreId, i18n.language]);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {t('hamburgerMenu.Genres')} 
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <LoadingIcon />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {series.map((serie) => (
            <MediaCard
              key={serie.id}
              title={serie.name}
              posterPath={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              releaseDate={serie.first_air_date}
              onClick={() => console.log(`Series clicked: ${serie.name}`)}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SeriesByGenrePage;
