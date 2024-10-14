import React, { useState, useEffect } from 'react';
import { fetchAwardWinningMovies } from '../../api/tmdbApi';
import { Box, Typography, Grid } from '@mui/material';
import MediaCard from '../../components/MediaCard/MediaCard';
import LoadingIcon from '../../components/Loading/LoadingIcon';
import { useTranslation } from 'react-i18next';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const AwardWinningMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n, t } = useTranslation();
  useEffect(() => {
    const getAwardWinningMovies = async () => {
      try {
        const movies = await fetchAwardWinningMovies(i18n.language);
        setMovies(movies);
        setLoading(false); // Veri geldikten sonra loading kapanır
      } catch (err) {
        setError('Ödüllü filmleri çekerken bir hata oluştu.');
        setLoading(false);
      }
    };

    getAwardWinningMovies();
  }, [i18n.language]);

  if (loading) {
    return <LoadingIcon />; // Yükleniyor durumunda loading spinner'ı gösteriyoruz
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
       {t("hamburgerMenu.Award Winning Movies")}
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <MediaCard
            key={movie.id}
            title={movie.title}
            posterPath={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            releaseDate={movie.release_date}
            onClick={() => console.log(`Clicked on ${movie.title}`)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default AwardWinningMovies;
