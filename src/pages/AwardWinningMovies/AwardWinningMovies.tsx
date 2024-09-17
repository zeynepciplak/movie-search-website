import React, { useState, useEffect } from 'react';
import { fetchAwardWinningMovies } from '../../api/tmdbApi'; // Ödüllü filmleri getiren API fonksiyonu
import { Box, Typography, Grid } from '@mui/material';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  
}

const AwardWinningMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Yükleniyor durumu için state
  const [error, setError] = useState<string | null>(null); // Hata durumu için state

  // Ödüllü filmleri çekme fonksiyonu
  useEffect(() => {
    const getAwardWinningMovies = async () => {
      try {
        const movies = await fetchAwardWinningMovies('en-US'); // API'den ödüllü filmleri çekiyoruz
        setMovies(movies);
        setLoading(false); // Veri geldikten sonra yüklenme durumu kapanır
      } catch (err) {
        setError('Ödüllü filmleri çekerken bir hata oluştu.'); // Hata yakalama
        setLoading(false);
      }
    };

    getAwardWinningMovies();
  }, []);

  if (loading) {
    return <Typography>Yükleniyor...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Award-Winning Movies
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={18} sm={9} md={6} lg={3} key={movie.id}>
            <Box display="flex" flexDirection="column" alignItems="center" margin="16px">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ borderRadius: '8px', objectFit: 'cover', width: '150px', height: '225px' }}
              />
              <Typography variant="h6" style={{ marginTop: '8px', textAlign: 'center' }}>
                {movie.title}
              </Typography>
              <Typography variant="body2" style={{ textAlign: 'center' }}>
                {new Date(movie.release_date).getFullYear()}
              </Typography>
              {/* Ödül bilgileri */}
              <Typography variant="body2" color="secondary" style={{ textAlign: 'center' }}>
              
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AwardWinningMovies;
