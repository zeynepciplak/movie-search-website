
import React, { useState, useEffect } from 'react';
import { fetchIMDbTop100Movies, Movie } from './src/api/tmdbApi' ;
import MovieGridItem from '../../MovieGridItem/MovieGridItem'; // Grid bileşenini import et
import Grid from '@mui/material/Grid';

const ImdbTop100Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchIMDbTop100Movies();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return (
    <Grid container spacing={3}>
      {movies.map((movie, index) => (
        <MovieGridItem key={movie.id} movie={movie} index={index} />
      ))}
    </Grid>
  );
};

export default ImdbTop100Movies;
