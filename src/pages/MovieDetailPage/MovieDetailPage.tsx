import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdbApi';
import { useState, useEffect } from 'react';

const MovieDetailPage: React.FC = () => {
  const { title } = useParams<{ title: string }>();  // URL'den title parametresini alıyoruz
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      if (title) {
        const details = await fetchMovieDetails(title);
        setMovieDetails(details);
      }
    };
    loadDetails();
  }, [title]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ width: '30%', marginRight: '20px' }}>
        <img src={movieDetails.poster_path} alt={movieDetails.title} style={{ width: '100%' }} />
      </div>
      <div style={{ width: '70%' }}>
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.overview}</p>
        <p>Release Date: {movieDetails.release_date}</p>
        <p>Rating: {movieDetails.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieDetailPage;
