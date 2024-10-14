import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMoviesByGenre } from '../../api/tmdbApi'; 
import MediaCard from '../../components/MediaCard/MediaCard'; 
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MoviesByGenrePage: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>(); 
  const [movies, setMovies] = useState<any[]>([]);
  const {i18n, t}=useTranslation();
  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMoviesByGenre(parseInt(genreId || '0'), i18n.language);
      setMovies(data);
    };
    loadMovies();
  }, [genreId,i18n.language]);

  return (
    <div>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <MediaCard
            key={movie.id}
            title={movie.title}
            posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            releaseDate={movie.release_date}
          />
        ))}
      </Grid>
    </div>
  );
};

export default MoviesByGenrePage;
