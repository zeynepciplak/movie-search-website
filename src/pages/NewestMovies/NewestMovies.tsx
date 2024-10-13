import React, { useEffect, useState } from 'react';
import { fetchNewestMovies } from '../../api/tmdbApi'; 
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material'; 
import MediaCard from '../../components/MediaCard/MediaCard';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../../components/Loading/LoadingIcon';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const NewestMovies: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);  // Yüklenme durumu

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);  // Yüklenme başladığında
      const data = await fetchNewestMovies(i18n.language, page);
      setMovies((prevMovies) => [...prevMovies, ...data]);
      setLoading(false);  // Yüklenme tamamlandığında
    };
    getMovies();
  }, [i18n.language, page]);

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1); // Sayfa numarasını artır
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {t('newest.Newest Movies')}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <LoadingIcon /> {/* Kendi tanımladığımız LoadingSpinner bileşeni */}
        </Box>
      ) : (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <MediaCard
              key={movie.id}
              title={movie.title}
              posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              releaseDate={movie.release_date}
              onClick={() => console.log(`Movie clicked: ${movie.title}`)}
            />
          ))}
        </Grid>
      )}

      {!loading && (
        <Box style={{ textAlign: 'center', marginTop: '20px' }}>
          <LoadMoreButton
            onClick={handleLoadMore}
            label={t('imdbtop100movies.Load More')}
          />
        </Box>
      )}
    </div>
  );
};

export default NewestMovies;
