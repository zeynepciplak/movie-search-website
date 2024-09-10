import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieGridItem from '../../MovieGridItem/MovieGridItem';
import CustomButton from '../../components/Button/Button';
import GroupAvatars from '../../components/Icon/GroupAvatars'; // Importing Avatar Group Component
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchPopularArtists } from '../../api/tmdbApi'; // Import the API for fetching artists
import { useNavigate } from 'react-router-dom';

const ImdbTop100Movies: React.FC = () => {
  const { t } = useTranslation();
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [artists, setArtists] = useState<any[]>([]); // State for artists
  const navigate = useNavigate();

  // Fetching movies from TMDB
  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=99cd5d08a91b7c3308edfd32c078eb7a&page=${page}`
    );
    setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    if (page >= 5) setHasMore(false);
  };

  // Fetching Top 5 artists for avatars
  const fetchArtists = async () => {
    const allArtists = await fetchPopularArtists();
    setArtists(allArtists.slice(0, 5)); // Getting the first 5 artists
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    fetchArtists();
  }, []);

  // Navigate to the Most Popular Artists page
  const handleMostPopularArtistsClick = () => {
    navigate('/most-popular-artists');
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Box flex="1">
        <h1>{t('imdbtop100movies.Top 100 Movies')}</h1>
        <Grid container spacing={2}>
          {movies.map((movie, index) => (
            <MovieGridItem key={index} movie={movie} index={index} />
          ))}
        </Grid>
        {hasMore && (
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            {t('imdbtop100movies.Load More')}
          </CustomButton>
        )}
      </Box>

      {/* Artists section */}
      <Box flex="0.3" padding="16px">
        <Typography variant="h5" onClick={handleMostPopularArtistsClick} style={{ cursor: 'pointer' }}>
          {t("Most Popular Artists")}
        </Typography>
        <GroupAvatars artists={artists} /> {/* Showing top 5 artists */}
      </Box>
    </Box>
  );
};

export default ImdbTop100Movies;
