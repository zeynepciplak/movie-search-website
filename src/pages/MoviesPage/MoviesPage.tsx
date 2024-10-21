import React, { useState, useEffect } from 'react';
import { Grid, Box ,Typography} from '@mui/material';
import MediaCard from '../../components/MediaCard/MediaCard'; 
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'; 
import { fetchAllMovies } from '../../api/tmdbApi'; 
import { Movie } from '../../api/tmdbApi'; 
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../../components/Loading/LoadingIcon'; 

const MoviesPage: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const fetchedMovies = await fetchAllMovies(i18n.language, page); 
        setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
      setLoading(false);
    };

    loadMovies();
  }, [i18n.language, page]);

  const handleLoadMore = async () => { 
    setPage((prevPage) => prevPage + 1); 
  };

  return (
    <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
        {t("hamburgerMenu.Movies")}
      </Typography>
      {loading && page === 1 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <LoadingIcon />
        </Box>
      ) : (
        <>
          <Grid container spacing={4} justifyContent="center">
            {movies.map((movie) => (
              <MediaCard
                key={movie.id}
                title={movie.title}
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                releaseDate={movie.release_date}
                xs={12} sm={6} md={4} lg={2}
              />
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {loading ? (
              <LoadingIcon /> 
            ) : (
              <LoadMoreButton onClick={handleLoadMore} label={t('imdbtop100movies.Load More')} /> 
            )
        }</Box>
        </>
      )}
    </Box>
  );
};

export default MoviesPage;
